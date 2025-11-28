import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistoriasClinicasController } from './gestion-historias-clinicas.controller';
import { GestionHistoriasClinicasService } from './gestion-historias-clinicas.service';

describe('GestionHistoriasClinicasController', () => {
  let controller: GestionHistoriasClinicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionHistoriasClinicasController],
      providers: [GestionHistoriasClinicasService],
    }).compile();

    controller = module.get<GestionHistoriasClinicasController>(GestionHistoriasClinicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
