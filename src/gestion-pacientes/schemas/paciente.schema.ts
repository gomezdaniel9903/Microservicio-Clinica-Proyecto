import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type HistoriaClinicaDocument = HydratedDocument<Paciente>;

@Schema({ collection: 'Patient', timestamps: true })
export class Paciente {

  @Prop({ required: true,unique: true })
  document: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  status: string;
}

export const PacienteSchema = SchemaFactory.createForClass(Paciente);
