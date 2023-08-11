import { Test, TestingModule } from '@nestjs/testing';
import { KnightRepositoryMongoDb } from './knight-repository-mongodb';
import { Model } from 'mongoose';
import { Knight } from '../entities/knight.entity';
import { getModelToken } from '@nestjs/mongoose';
import { KnightMock } from '../mocks/create-knight-mock';
import { FindAllKnigthMock } from '../mocks/find-all-knights-mock';

describe('KnightRepositoryMongoDb', () => {
  let repository: KnightRepositoryMongoDb;
  let knightModel: Model<Knight>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        KnightRepositoryMongoDb,
        {
          provide: getModelToken('Knight'),
          useValue: {
            create: jest.fn().mockReturnValue(KnightMock),
            update: jest.fn().mockReturnValue({
              id: '1ca370f1-7013-4788-888e-b11e81bb1e93',
              name: 'Jett Name Update',
              nickname: 'King of update',
              birthday: new Date('1990-05-15'),
              weapons: [
                {
                  name: 'sword',
                  mod: 3,
                  attr: 'strength',
                  equipped: true,
                },
              ],
              attributes: {
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intelligence: 0,
                wisdom: 0,
                charisma: 0,
              },
              keyAttribute: 'teste',
            }),

            findAll: jest.fn().mockRejectedValue(KnightMock),
            find: jest.fn().mockReturnValue(FindAllKnigthMock),
            findById: jest.fn().mockReturnValue(true),
            findOne: jest.fn().mockReturnValue(true),
            updateOne: jest.fn().mockReturnValue(true),

            findByIdAndDelete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    repository = moduleRef.get<KnightRepositoryMongoDb>(
      KnightRepositoryMongoDb,
    );
    knightModel = moduleRef.get<Model<Knight>>(getModelToken('Knight'));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Create new Knight', () => {
    it('should return a new knight', async () => {
      const knight = await repository.create({
        name: 'Jett 2',
        nickname: 'King of wind 2',
        birthday: new Date('1990-05-15'),
        weapons: [
          {
            name: 'sword',
            mod: 3,
            attr: 'strength',
            equipped: true,
          },
        ],
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        keyAttribute: 'teste',
      });

      expect(typeof knight).toBe('object');
      expect(knight).toHaveProperty('name');
    });

    it('should return error when create a new knight', async () => {
      jest.spyOn(knightModel, 'create').mockReturnValueOnce(null);

      expect(async () => {
        await repository.create(KnightMock);
      }).rejects.toThrow('Create Error');
    });
  });

  describe('Update Knight', () => {
    it('should update knights', async () => {
      const knigth = {
        ...KnightMock,
        id: '1ca370f1-7013-4788-888e-b11e81bb1e93',
        name: 'Jett Name Update',
        nickname: 'King of update',
      };

      const updatedKnight = await repository.update(
        { id: '1ca370f1-7013-4788-888e-b11e81bb1e93' },
        knigth,
      );

      expect(updatedKnight).toHaveProperty('name');
      expect(updatedKnight).toHaveProperty('id');
      expect(typeof updatedKnight).toBe('object');
      expect(updatedKnight.name).toEqual(
        expect.stringContaining('Jett Name Update'),
      );
      expect(updatedKnight.nickname).toEqual(
        expect.stringContaining('King of update'),
      );
    });
  });

  describe('FindAll Knights', () => {
    it('should return all knights', async () => {
      const knight = await repository.findAll();

      expect(Array.isArray(knight)).toBe(true);
    });
  });

  describe('FindOne Knight', () => {
    it('should return all knights', async () => {
      const knight = await repository.findOne(
        '3fbfadc0-c511-4824-8615-83336619833a',
      );

      expect(knight).toBe(true);
    });
  });

  describe('Delete Knight', () => {
    it('should remove knights', async () => {
      const knight = await repository.remove(
        '3fbfadc0-c511-4824-8615-83336619833a',
      );

      expect(knight).toBe(true);
    });

    it('should return error when remove knight', async () => {
      jest.spyOn(knightModel, 'findByIdAndDelete').mockReturnValueOnce(null);

      expect(async () => {
        await repository.remove('3fbfadc0-c511-4824-8615-83336619833a');
      }).rejects.toThrow('Delete Error');
    });
  });
});
