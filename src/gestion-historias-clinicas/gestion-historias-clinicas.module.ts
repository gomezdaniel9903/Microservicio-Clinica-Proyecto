import { Module } from '@nestjs/common';
import { GestionHistoriasClinicasService } from './gestion-historias-clinicas.service';
import { GestionHistoriasClinicasController } from './gestion-historias-clinicas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriaClinica, HistoriaClinicaSchema } from './schemas/historia-clinica.schema';
import { GestionPacientesModule } from 'src/gestion-pacientes/gestion-pacientes.module';
import { GestionTiposTumoresModule } from 'src/gestion-tipos-tumores/gestion-tipos-tumores.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HistoriaClinica.name, schema: HistoriaClinicaSchema },
    ]),
    GestionPacientesModule,
    GestionTiposTumoresModule
  ],
  controllers: [GestionHistoriasClinicasController],
  providers: [GestionHistoriasClinicasService],
})
export class GestionHistoriasClinicasModule {}
