/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  
    // CREATE
    async create(dto: CreateGestionTiposTumoreDto) {
      try{
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
        throw new InternalServerErrorException(error.errorResponse.errmsg)
      }
      
    }
  
    // UPDATE
    async update(dto: UpdateGestionTiposTumoreDto) {
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
    }
  
    // GET BY ID
    async findOne(id: string) {
      const tumor = await this.tumorModel.findOne({identifier:id});
  
      if (!tumor) {
        throw new NotFoundException('Tipo de Tumor no encontrado');
      }
  
      return {
        msg: 'Historia clínica consultada',
        id: tumor.identifier,
        datosGenerales: tumor,
      };
    }
  
    // DELETE
    async remove(id: string) {
      const deleted = await this.tumorModel.findOneAndDelete({identifier:id});
  
      if (!deleted) {
        throw new NotFoundException('Tipo de Tumor no encontrado');
      }
  
      return {
        msg: 'Tipo de tumor eliminado',
        id: deleted.identifier,
        datosGenerales: deleted,
      };
    }
}
