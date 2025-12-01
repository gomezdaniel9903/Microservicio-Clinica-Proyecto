import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type TiposTumoresDocument = HydratedDocument<TiposTumores>;

@Schema({ collection: 'TumorType', timestamps: true })
export class TiposTumores {
  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  systemAffected: string;
}

export const TiposTumoresSchema = SchemaFactory.createForClass(TiposTumores);
