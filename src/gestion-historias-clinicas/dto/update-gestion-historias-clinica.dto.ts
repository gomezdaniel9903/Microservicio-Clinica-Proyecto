import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateGestionHistoriasClinicaDto{
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsOptional()
  patientId?: string;

  @IsString()
  @IsOptional()
  tumorTypeId?: string;

  @IsDateString()
  @IsOptional()
  diagnosisDate?: Date;

  @IsString()
  @IsOptional()
  stage?: string;

  @IsString()
  @IsOptional()
  treatmentProtocol?: string;
}
