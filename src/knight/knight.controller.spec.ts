import { Test } from '@nestjs/testing';
import { KnightController } from './knight.controller';
import { KnightService } from './knight.service';
import { Knight } from './entities/knight.entity';
import { KnightMock } from './mocks/create-knight-mock';

describe('KnightController', () => {
  let controller: KnightController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [KnightController],
      providers: [
        {
          provide: KnightService,
          useValue: {
            create: jest.fn().mockReturnValue(new Knight(KnightMock)),
            findAll: jest
              .fn()
              .mockReturnValue([
                new Knight(KnightMock),
                new Knight(KnightMock),
              ]),
            findOne: jest.fn().mockReturnValue(true),
            remove: jest.fn().mockReturnValue(true),
            update: jest.fn().mockReturnValue({
              id: '1ca370f1-7013-4788-888e-b11e81bb1e93',
              name: 'Jett Name Update',
              nickname: 'King of update',
              birthday: new Date('1990-05-15'),
              age: 33,
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
          },
        },
      ],
    }).compile();
    controller = moduleRef.get<KnightController>(KnightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Create new Knight', () => {
    it('should return a new knight', () => {
      const knight = controller.create({
        name: 'Jett',
        nickname: 'King of wind 2',
        birthday: new Date('1990-05-15'),
        age: 33,
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

      expect(knight).toHaveProperty('name');
      expect(knight).toHaveProperty('id');
      expect(typeof knight).toBe('object');
    });
  });

  describe('FindAll Knights', () => {
    it('should return all knights', () => {
      const knight = controller.findAll();

      expect(Array.isArray(knight)).toBe(true);
    });
  });

  describe('FindOne Knight', () => {
    it('should return all knights', () => {
      const knight = controller.findOne('3fbfadc0-c511-4824-8615-83336619833a');

      expect(knight).toBe(true);
    });
  });

  describe('Update Knight', () => {
    it('should return all knights', async () => {
      const knigth = {
        ...KnightMock,
        id: '1ca370f1-7013-4788-888e-b11e81bb1e93',
        name: 'Jett Name Update',
        nickname: 'King of update',
      };

      const updatedKnight = await controller.update(
        '1ca370f1-7013-4788-888e-b11e81bb1e93',
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

  describe('Delete Knight', () => {
    it('should remove knight', () => {
      const knight = controller.remove('3fbfadc0-c511-4824-8615-83336619833a');

      expect(knight).toBe(true);
    });
  });
});
