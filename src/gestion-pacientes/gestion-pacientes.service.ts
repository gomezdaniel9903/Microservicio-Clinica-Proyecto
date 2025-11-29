/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Paciente } from './schemas/paciente.schema';
import { CreateGestionPacienteDto } from './dto/create-gestion-paciente.dto';
import { UpdateGestionPacienteDto } from './dto/update-gestion-paciente.dto';

@Injectable()
export class GestionPacientesService {
  constructor(
      @InjectModel(Paciente.name)
      private readonly patientModel: Model<Paciente>,
    ) {}
  
    async create(dto: CreateGestionPacienteDto) {
      try{

        if(!dto.document || !dto.lastName || !dto.lastName || !dto.birthDate || !dto.gender){
          throw new BadRequestException('Revise los campos enviados.');
        }
        if(!dto.status){
          dto.status = 'Activo';
        }
        const exists = await this.patientModel.findOne({document:dto.document})
        if(exists){
          throw new InternalServerErrorException("El paciente ya existe en la base de datos.")
        }
        const data = {
          ...dto,
          diagnosisDate: new Date(dto.birthDate),
        };

        
    
        const created = await this.patientModel.create(data);
    
        return {
          msg: 'Paciente registrado exitosamente',
          id: created.document,
          datosGenerales: created,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async update(dto: UpdateGestionPacienteDto) {
      try{
        const { document, ...changes } = dto;
  
        if (changes.birthDate) {
          changes.birthDate = new Date(changes.birthDate);
        }
    
        const updated = await this.patientModel.findOneAndUpdate({document:document}, changes, {
          new: true,
        });
    
        if (!updated) {
          throw new NotFoundException('Paciente no encontrado');
        }
    
        return {
          msg: 'Paciente actualizado',
          id: updated.document,
          datosGenerales: updated,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async findOne(id: string) {
      try{
        const patient = await this.patientModel.findOne({document:id});
  
        if (!patient) {
          throw new NotFoundException('Paciente no encontrado');
        }
    
        return {
          msg: 'Paciente consultado',
          id: patient.document,
          datosGenerales: patient,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }

    async findAll() {
      try{
        const patient = await this.patientModel.find();
    
        return {
          msg: 'Registros obtenidos exitosamente.',
          registros: patient,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async deactivated(id: string) {
      try{
        const deactivated = await this.patientModel.findOneAndUpdate({document:id},{ $set: { status: 'Inactivo' } },{new:true});
  
        if (!deactivated) {
          throw new NotFoundException('Paciente no encontrado');
        }
    
        return {
          msg: 'Paciente desactivado',
          id: deactivated.document,
          datosGenerales:deactivated,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
}
