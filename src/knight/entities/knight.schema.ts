import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Knight } from './knight.entity';

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class KnightMongoSchema {
  @Prop({ default: () => uuidv4() })
  readonly _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: string;

  @Prop([
    {
      name: { type: String, required: true },
      mod: { type: Number, required: true },
      attr: { type: String, required: true },
      equipped: { type: Boolean, default: true },
    },
  ])
  weapons: {
    name: string;
    mod: number;
    attr: string;
    equipped: true;
  }[];

  @Prop({
    type: {
      strength: { type: Number, required: true },
      dexterity: { type: Number, required: true },
      constitution: { type: Number, required: true },
      intelligence: { type: Number, required: true },
      wisdom: { type: Number, required: true },
      charisma: { type: Number, required: true },
    },
  })
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @Prop()
  keyAttribute: string;
}

export const KnightSchema = SchemaFactory.createForClass(KnightMongoSchema);
