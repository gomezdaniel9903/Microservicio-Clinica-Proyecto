import { Module } from '@nestjs/common';
import { GestionPacientesService } from './gestion-pacientes.service';
import { GestionPacientesController } from './gestion-pacientes.controller';
import { Paciente, PacienteSchema } from './schemas/paciente.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Paciente.name, schema: PacienteSchema },
      ]),
    ],
  controllers: [GestionPacientesController],
  providers: [GestionPacientesService,],
  exports: [
    MongooseModule.forFeature([
      { name: Paciente.name, schema: PacienteSchema },
    ]),
  ]
})
export class GestionPacientesModule {}
