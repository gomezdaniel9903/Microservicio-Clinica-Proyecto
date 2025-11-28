import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GestionHistoriasClinicasModule } from './gestion-historias-clinicas/gestion-historias-clinicas.module';
import { GestionPacientesModule } from './gestion-pacientes/gestion-pacientes.module';
import { GestionTiposTumoresModule } from './gestion-tipos-tumores/gestion-tipos-tumores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        
        const user = process.env.MONGO_USER;
        const pass = process.env.MONGO_PASS;
        const host = process.env.MONGO_HOST;
        
        const uri = `mongodb://${user}:${pass}@${host}/clinica?authSource=admin`;
        
        return {
          uri: uri,
        };
        // ----------------------------------------------------------------
      }
    }),
    GestionHistoriasClinicasModule,
    GestionPacientesModule,
    GestionTiposTumoresModule
  ],
})
export class AppModule {}
