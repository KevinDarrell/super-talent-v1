import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AnalyzeCvDto, WebhookResultDto } from './dto/analyze-cv.dto';
import { CvStatus } from '@prisma/client';

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('cv_queue') private cvQueue: Queue,
  ) {}

  async requestAnalysis(dto: AnalyzeCvDto, userId: string | null = null) {
    let mode = 'general';
    if (dto.jobDescriptionUrl) mode = 'url_match';
    else if (dto.jobDescriptionText) mode = 'text_match';

    const cv = await this.prisma.cV.create({
      data: {
        userId: userId, 
        fileKey: dto.fileKey,
        status: CvStatus.PENDING,
      },
    });

  
    await this.cvQueue.add(
      'analyze_job',
      {
        cvId: cv.id,
        fileKey: dto.fileKey,
        jobContext: {
          text: dto.jobDescriptionText,
          url: dto.jobDescriptionUrl,
          mode: mode,
        },
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );

    this.logger.log(`Analysis requested for CV ${cv.id} [Guest: ${!userId}]`);

    return { cvId: cv.id, status: 'QUEUED' };
  }

  async handleWebhook(payload: WebhookResultDto) {
    const { cvId, result, status } = payload;

    const dbStatus = status === 'COMPLETED' ? CvStatus.COMPLETED : CvStatus.FAILED;

    const updatedCv = await this.prisma.cV.update({
      where: { id: cvId },
      data: {
        status: dbStatus,
        analysisResult: result, 
      },
    });

    this.logger.log(`Webhook received for CV ${cvId}. Status: ${dbStatus}`);
    return updatedCv;
  }
}