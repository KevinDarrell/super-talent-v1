import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cv_queue',
    }),
  ],
  controllers: [CvController],
  providers: [CvService, PrismaService],
})
export class CvModule {}