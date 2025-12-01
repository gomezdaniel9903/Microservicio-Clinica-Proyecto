/* eslint-disable prettier/prettier */
import { Controller, Post, Patch, Get, Delete, Body, Query } from '@nestjs/common';
import { GestionTiposTumoresService } from './gestion-tipos-tumores.service';
import { CreateGestionTiposTumoreDto } from './dto/create-gestion-tipos-tumore.dto';
import { UpdateGestionTiposTumoreDto } from './dto/update-gestion-tipos-tumore.dto';

@Controller('api/v1/clinica/gestion-tipos-tumores')
export class GestionTiposTumoresController {
  constructor(private readonly service: GestionTiposTumoresService) {}
    
      @Post('registerTypeTumor')
      create(@Body() dto: CreateGestionTiposTumoreDto) {
        return this.service.create(dto);
      }
    
      @Patch('updateTypeTumor')
      update(@Body() dto: UpdateGestionTiposTumoreDto) {
        return this.service.update(dto);
      }
    
      @Get('searchTypeTumor')
      findOne(@Query('identifier') id: string) {
        return this.service.findOne(id);
      }

      @Get('searchTypeTumors')
      findAll(){
        return this.service.findAll();
      }
    
      @Delete('deleteTypeTumor')
      remove(@Query('identifier') id: string) {
        return this.service.remove(id);
      }
}
