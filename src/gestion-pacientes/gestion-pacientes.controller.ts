/* eslint-disable prettier/prettier */
import { Controller, Post, Patch, Get, Body, Query } from '@nestjs/common';
import { GestionPacientesService } from './gestion-pacientes.service';
import { CreateGestionPacienteDto } from './dto/create-gestion-paciente.dto';
import { UpdateGestionPacienteDto } from './dto/update-gestion-paciente.dto';

@Controller('api/v1/clinica/gestion-pacientes')
export class GestionPacientesController {
  constructor(private readonly service: GestionPacientesService) {}
  
    @Post('registerPatient')
    create(@Body() dto: CreateGestionPacienteDto) {
      return this.service.create(dto);
    }
  
    @Patch('updatePatient')
    update(@Body() dto: UpdateGestionPacienteDto) {
      return this.service.update(dto);
    }
  
    @Get('searchPatient')
    findOne(@Query('document') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch('deactivatePatient')
    remove(@Body() body: { document: string }) {
      return this.service.deactivated(body.document);
    }
}
