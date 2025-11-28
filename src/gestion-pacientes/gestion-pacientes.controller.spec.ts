import { Test, TestingModule } from '@nestjs/testing';
import { GestionPacientesController } from './gestion-pacientes.controller';
import { GestionPacientesService } from './gestion-pacientes.service';

describe('GestionPacientesController', () => {
  let controller: GestionPacientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionPacientesController],
      providers: [GestionPacientesService],
    }).compile();

    controller = module.get<GestionPacientesController>(GestionPacientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
