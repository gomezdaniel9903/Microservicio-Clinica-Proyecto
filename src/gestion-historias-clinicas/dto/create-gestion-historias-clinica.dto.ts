/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
export class CreateGestionHistoriasClinicaDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  tumorTypeId: string;

  @IsDateString()
  diagnosisDate: string;

  @IsString()
  @IsNotEmpty()
  stage: string;

  @IsString()
  @IsNotEmpty()
  treatmentProtocol: string;
}
