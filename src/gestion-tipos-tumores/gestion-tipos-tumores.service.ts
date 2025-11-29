/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TiposTumores } from './schemas/tipos-tumores.schema';
import { CreateGestionTiposTumoreDto } from './dto/create-gestion-tipos-tumore.dto';
import { UpdateGestionTiposTumoreDto } from './dto/update-gestion-tipos-tumore.dto';

@Injectable()
export class GestionTiposTumoresService {
  constructor(
      @InjectModel(TiposTumores.name)
      private readonly tumorModel: Model<TiposTumores>,
    ) {}
  
    async create(dto: CreateGestionTiposTumoreDto) {
      try{
        if(!dto.identifier || !dto.name || !dto.systemAffected){
          throw new BadRequestException('Revise los campos enviados.');
        }
        const exists = await this.tumorModel.findOne({identifier:dto.identifier})
        if(exists){
          throw new InternalServerErrorException("El tipo de tumor ya existe en la base de datos.")
        }
        const data = {
          ...dto
        };
    
        const created = await this.tumorModel.create(data);
    
        return {
          msg: 'Tipo de Tumor registrada exitosamente',
          id: created.identifier,
          datosGenerales: created,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async update(dto: UpdateGestionTiposTumoreDto) {
      try{
        const { identifier, ...changes } = dto;
  
        const updated = await this.tumorModel.findOneAndUpdate({identifier:identifier}, changes, {
          new: true,
        });
    
        if (!updated) {
          throw new NotFoundException('Tipo de Tumor no encontrada');
        }
    
        return {
          msg: 'Tipo de Tumor actualizado',
          id: updated.identifier,
          datosGenerales: updated,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async findOne(id: string) {
      try{
        const tumor = await this.tumorModel.findOne({identifier:id});
  
        if (!tumor) {
          throw new NotFoundException('Tipo de Tumor no encontrado');
        }
    
        return {
          msg: 'Historia clínica consultada',
          id: tumor.identifier,
          datosGenerales: tumor,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }

    async findAll() {
      try{
        const tumor = await this.tumorModel.find();
  
        return {
          msg: 'Registros obtenidos exitosamente.',
          registros: tumor,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
  
    async remove(id: string) {
      try{
        const deleted = await this.tumorModel.findOneAndDelete({identifier:id});
  
        if (!deleted) {
          throw new NotFoundException('Tipo de Tumor no encontrado');
        }
    
        return {
          msg: 'Tipo de tumor eliminado',
          id: deleted.identifier,
          datosGenerales: deleted,
        };
      }catch(error){
        throw new InternalServerErrorException(error)
      }
      
    }
}
