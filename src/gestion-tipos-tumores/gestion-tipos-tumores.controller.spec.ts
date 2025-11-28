import { Test, TestingModule } from '@nestjs/testing';
import { GestionTiposTumoresController } from './gestion-tipos-tumores.controller';
import { GestionTiposTumoresService } from './gestion-tipos-tumores.service';

describe('GestionTiposTumoresController', () => {
  let controller: GestionTiposTumoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionTiposTumoresController],
      providers: [GestionTiposTumoresService],
    }).compile();

    controller = module.get<GestionTiposTumoresController>(GestionTiposTumoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
