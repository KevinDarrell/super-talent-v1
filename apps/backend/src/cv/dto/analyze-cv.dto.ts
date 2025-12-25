import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class AnalyzeCvDto {
  @IsString()
  @IsNotEmpty()
  fileKey: string; 
  @IsOptional()
  @IsString()
  jobDescriptionText?: string;

  @IsOptional()
  @IsUrl()
  jobDescriptionUrl?: string;
}

export class WebhookResultDto {
  @IsString()
  @IsNotEmpty()
  cvId: string;

  @IsNotEmpty()
  result: any; 
  
  @IsString()
  status: 'COMPLETED' | 'FAILED';
}