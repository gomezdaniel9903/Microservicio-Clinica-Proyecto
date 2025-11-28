import { Controller, Post, Patch, Get, Delete, Body, Query } from '@nestjs/common';
import { GestionHistoriasClinicasService } from './gestion-historias-clinicas.service';
import { CreateGestionHistoriasClinicaDto } from './dto/create-gestion-historias-clinica.dto';
import { UpdateGestionHistoriasClinicaDto } from './dto/update-gestion-historias-clinica.dto';

@Controller('api/v1/clinica/gestion-historias-clinicas')
export class GestionHistoriasClinicasController {
  constructor(private readonly service: GestionHistoriasClinicasService) {}

  @Post('registerClinicalRecord')
  create(@Body() dto: CreateGestionHistoriasClinicaDto) {
    return this.service.create(dto);
  }

  @Patch('updateClinicalRecord')
  update(@Body() dto: UpdateGestionHistoriasClinicaDto) {
    return this.service.update(dto);
  }

  @Get('searchClinicalRecord')
  findOne(@Query('identifier') id: string) {
    return this.service.findOne(id);
  }

  @Delete('deleteClinicalRecord')
  remove(@Body() body: { identifier: string }) {
    return this.service.remove(body.identifier);
  }
}
