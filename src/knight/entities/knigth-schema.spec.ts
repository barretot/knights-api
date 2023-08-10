import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { KnightSchema, KnightMongoSchema } from './knight.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('KnightSchema', () => {
  let knightModel: Model<KnightMongoSchema>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('Knight'),
          useValue: KnightSchema,
        },
      ],
    }).compile();

    knightModel = module.get<Model<KnightMongoSchema>>(getModelToken('Knight'));
  });

  it('should be defined', () => {
    expect(knightModel).toBeDefined();
  });
});
