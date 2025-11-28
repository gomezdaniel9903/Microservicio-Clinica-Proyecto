import { Module } from '@nestjs/common';
import { GestionTiposTumoresService } from './gestion-tipos-tumores.service';
import { GestionTiposTumoresController } from './gestion-tipos-tumores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TiposTumores, TiposTumoresSchema } from './schemas/tipos-tumores.schema';
@Module({
  imports: [
        MongooseModule.forFeature([
          { name: TiposTumores.name, schema: TiposTumoresSchema },
        ]),
      ],
  controllers: [GestionTiposTumoresController],
  providers: [GestionTiposTumoresService],
  exports: [
    MongooseModule.forFeature([
      { name: TiposTumores.name, schema: TiposTumoresSchema },
    ]),
  ]
})
export class GestionTiposTumoresModule {}
