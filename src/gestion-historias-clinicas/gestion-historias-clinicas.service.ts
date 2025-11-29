/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HistoriaClinica } from './schemas/historia-clinica.schema';
import { CreateGestionHistoriasClinicaDto } from './dto/create-gestion-historias-clinica.dto';
import { UpdateGestionHistoriasClinicaDto } from './dto/update-gestion-historias-clinica.dto';
import { Paciente } from 'src/gestion-pacientes/schemas/paciente.schema';
import { TiposTumores } from 'src/gestion-tipos-tumores/schemas/tipos-tumores.schema';


@Injectable()
export class GestionHistoriasClinicasService {
  constructor(
    @InjectModel(HistoriaClinica.name)
    private readonly clinicalRecordModel: Model<HistoriaClinica>,
    @InjectModel(Paciente.name)
    private readonly patientModel: Model<Paciente>,
    @InjectModel(TiposTumores.name)
    private readonly typeTumorModel: Model<TiposTumores>
  ) {}

  async create(dto: CreateGestionHistoriasClinicaDto) {
    try{
      if(!dto.identifier || !dto.patientId || !dto.tumorTypeId || !dto.diagnosisDate || !dto.stage
        || !dto.treatmentProtocol
      ){
        throw new BadRequestException('Revise los campos enviados.');
      }
      const data = {
        ...dto,
        diagnosisDate: new Date(dto.diagnosisDate),
      };
  
      
      const patient = await this.patientModel.findOne({document:data.patientId});
  
      if (!patient) {
        throw new NotFoundException('Paciente no encontrado');
      }
  
      const typeTumor = await this.typeTumorModel.findOne({identifier:data.tumorTypeId});
  
      if (!typeTumor) {
        throw new NotFoundException('Tipo de Tumor no encontrado');
      }
      const created = await this.clinicalRecordModel.create(data);
  
      return {
        msg: 'Historia clínica registrada exitosamente',
        id: created.identifier,
        datosGenerales: created,
      };
    }catch(error){
      throw new InternalServerErrorException(error)
    }
    
  }

  async update(dto: UpdateGestionHistoriasClinicaDto) {
    try{
      const { identifier, ...changes } = dto;

      if (changes.diagnosisDate) {
        changes.diagnosisDate = new Date(changes.diagnosisDate);
      }

      const updated = await this.clinicalRecordModel.findOneAndUpdate({identifier:identifier}, changes, {
        new: true,
      });

      if (!updated) {
        throw new NotFoundException('Historia clínica no encontrada');
      }

      return {
        msg: 'Historia clínica actualizada',
        id: updated.identifier,
        datosGenerales: updated,
      };
    }catch(error){
      throw new InternalServerErrorException(error)
    }
    
  }

  async findOne(id: string) {
    try{
      const historia = await this.clinicalRecordModel.findOne({identifier:id});

      if (!historia) {
        throw new NotFoundException('Historia clínica no encontrada');
      }

      return {
        msg: 'Historia clínica consultada',
        id: historia.identifier,
        datosGenerales: historia,
      };
    }catch(error){
      throw new InternalServerErrorException(error)
    }
    
  }

  async findAll() {
    try{
      const historia = await this.clinicalRecordModel.find();

      return {
        msg: 'Registros obtenidos exitosamente.',
        registros: historia
        
      };
    }catch(error){
      throw new InternalServerErrorException(error)
    }
    
  }

  async remove(id: string) {
    try{
      const deleted = await this.clinicalRecordModel.findOneAndDelete({identifier:id});

      if (!deleted) {
        throw new NotFoundException('Historia clínica no encontrada');
      }

      return {
        msg: 'Historia clínica eliminada',
        id: deleted.identifier,
        datosGenerales: deleted,
      };
    }catch(error){
      throw new InternalServerErrorException(error)
    }
    
  }
}
