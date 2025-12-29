import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CvService } from './cv.service';
import { AnalyzeCvDto, WebhookResultDto } from './dto/analyze-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  // PUBLIC ENDPOINT
  @Post('analyze')
  @HttpCode(HttpStatus.ACCEPTED) 
  async analyze(@Body() analyzeCvDto: AnalyzeCvDto) {
    const guestUserId = null; 
    
    return this.cvService.requestAnalysis(analyzeCvDto, guestUserId);
  }

  // INTERNAL WEBHOOK (Python Engine calls this)
  @Post('webhook')
  async webhook(@Body() payload: WebhookResultDto) {
    return this.cvService.handleWebhook(payload);
  }
}