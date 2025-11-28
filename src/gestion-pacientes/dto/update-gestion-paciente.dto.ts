/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateGestionPacienteDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
