import { Test, TestingModule } from '@nestjs/testing';
import { GestionPacientesService } from './gestion-pacientes.service';

describe('GestionPacientesService', () => {
  let service: GestionPacientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionPacientesService],
    }).compile();

    service = module.get<GestionPacientesService>(GestionPacientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
