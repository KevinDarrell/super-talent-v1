from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from typing import Optional, Dict, Any
import asyncio
import json

# --- IMPORT MODULES ---
from src.schemas import AnalysisResult, ImprovedCVResult
from src.services.extractor import extract_text_from_bytes
from src.services.ai_engine import analyze_cv, customize_cv 
from src.services.scraper import scrape_job_with_jina

app = FastAPI(title="CV Analyzer API", version="1.5.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WRAPPER ASYNC ---
def blocking_analyze(cv_text: str, job_desc: str):
    return asyncio.run(analyze_cv(cv_text, job_desc))

def blocking_customize(cv_text: str, mode: str, context_data: str):
    return asyncio.run(customize_cv(cv_text, mode, context_data))

# ==============================================================================
# 1. ENDPOINT ANALYZE (FIXED)
# ==============================================================================
# HAPUS 'response_model=AnalysisResult' agar bisa return Dictionary {analysis, cv_data}
@app.post("/api/analyze")
async def analyze_endpoint(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None),
    job_url: Optional[str] = Form(None)
):
    # 1. Siapkan Konteks Job Description
    final_jd = ""
    if job_description and job_description.strip():
        final_jd = job_description
    elif job_url and job_url.strip():
        print(f"Fetching JD from URL: {job_url}")
        final_jd = await scrape_job_with_jina(job_url)
    
    if not final_jd:
        final_jd = "General Tech Professional requirements (Assess based on standard industry best practices)."

    # 2. Baca File CV
    content = await file.read()
    try:
        cv_text = await run_in_threadpool(
            extract_text_from_bytes, 
            content, 
            file.content_type
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gagal membaca file: {str(e)}")

    if len(cv_text) < 50:
        raise HTTPException(status_code=400, detail="CV terlalu pendek atau kosong.")

    # 3. Panggil AI Analysis
    try:
        # Output dari ai_engine sekarang adalah Dict: {'analysis': ..., 'cv_data': ...}
        result = await run_in_threadpool(blocking_analyze, cv_text, final_jd)
        return result
    except Exception as e:
        print(f"AI Error: {e}")
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")

# ==============================================================================
# 2. ENDPOINT CUSTOMIZE
# ==============================================================================
@app.post("/api/customize", response_model=ImprovedCVResult)
async def customize_endpoint(
    file: UploadFile = File(...),
    mode: str = Form(...),
    job_description: Optional[str] = Form(None),
    analysis_context: Optional[str] = Form(None)
):
    final_context = ""
    
    if mode == "job_desc":
        if not job_description:
            raise HTTPException(400, "Mode 'job_desc' wajib menyertakan job_description.")
        final_context = job_description
        
    elif mode == "analysis":
        if not analysis_context:
            final_context = "Fix general weaknesses found in the CV."
        else:
            final_context = analysis_context 
    else:
        raise HTTPException(400, "Mode tidak valid.")

    content = await file.read()
    try:
        cv_text = await run_in_threadpool(
            extract_text_from_bytes, 
            content, 
            file.content_type
        )
    except Exception as e:
        raise HTTPException(400, f"Gagal membaca file: {str(e)}")

    try:
        result = await run_in_threadpool(blocking_customize, cv_text, mode, final_context)
        return result
    except Exception as e:
        print(f"Customize Error: {e}")
        raise HTTPException(500, "Gagal meng-generate CV baru.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, timeout_keep_alive=300)