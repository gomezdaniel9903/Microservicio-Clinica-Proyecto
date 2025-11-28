import { Test, TestingModule } from '@nestjs/testing';
import { GestionTiposTumoresService } from './gestion-tipos-tumores.service';

describe('GestionTiposTumoresService', () => {
  let service: GestionTiposTumoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionTiposTumoresService],
    }).compile();

    service = module.get<GestionTiposTumoresService>(GestionTiposTumoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
