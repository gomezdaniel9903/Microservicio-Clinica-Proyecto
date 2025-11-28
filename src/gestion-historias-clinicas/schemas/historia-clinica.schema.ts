import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type HistoriaClinicaDocument = HydratedDocument<HistoriaClinica>;

@Schema({ collection: 'ClinicalRecord', timestamps: true })
export class HistoriaClinica {
  @Prop({ required: true, unique:true })
  identifier: string;

  @Prop({ required: true })
  patientId: string;

  @Prop({ required: true })
  tumorTypeId: string;

  @Prop({ required: true, type: Date })
  diagnosisDate: Date;

  @Prop({ required: true })
  stage: string;

  @Prop({ required: true })
  treatmentProtocol: string;
}

export const HistoriaClinicaSchema = SchemaFactory.createForClass(HistoriaClinica);
