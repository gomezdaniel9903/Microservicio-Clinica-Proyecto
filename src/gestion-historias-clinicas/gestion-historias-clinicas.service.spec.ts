import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistoriasClinicasService } from './gestion-historias-clinicas.service';

describe('GestionHistoriasClinicasService', () => {
  let service: GestionHistoriasClinicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionHistoriasClinicasService],
    }).compile();

    service = module.get<GestionHistoriasClinicasService>(GestionHistoriasClinicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
