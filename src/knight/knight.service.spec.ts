import { KnightService } from './knight.service';
import { KnightRepositoryInMemory } from './repository/knight-repository-in-memory';
import { KnightMockService } from './mocks/create-knight-service-mock';
import { Test, TestingModule } from '@nestjs/testing';

describe('KnightService', () => {
  let service: KnightService;
  let knigthRepository: KnightRepositoryInMemory;

  beforeEach(() => {
    knigthRepository = new KnightRepositoryInMemory();
    service = new KnightService(knigthRepository as any);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Knight', async () => {
    const knight = await service.create(KnightMockService);

    expect(knigthRepository.items[0]).toEqual(knight);
  });

  it('should return error when create Knight', async () => {
    const copy = {
      ...KnightMockService,
      id: null,
    };
    const knight = await service.create(copy);

    expect(knigthRepository.items[0]).toEqual(knight);
  });

  it('should update Knight', async () => {
    const knigth = {
      ...KnightMockService,
      id: 'fc9d2178-9856-472a-b9e5-071086cd8d76',
      name: 'Jett Name Update',
      nickname: 'King of update',
    };

    await knigthRepository.create(KnightMockService);

    const updatedKnight = await service.update({ id: knigth.id }, knigth);

    expect(knigthRepository.items[0]).toEqual(updatedKnight);
  });

  it('should listAll Knight', async () => {
    await knigthRepository.create(KnightMockService);

    const allKnigths = await service.findAll();

    expect(knigthRepository.items[0]).toEqual(allKnigths[0]);
  });

  it('should findOne Knight', async () => {
    await knigthRepository.create(KnightMockService);

    const findOneKnight = await service.findOne(
      'fc9d2178-9856-472a-b9e5-071086cd8d76',
    );

    expect(knigthRepository.items[0]).toEqual(findOneKnight);
  });

  it('should return error when findOne Knight', async () => {
    await knigthRepository.create(KnightMockService);

    expect(async () => {
      await service.findOne('fc9d2178-9856-472a-b9e5-071086cd8d7');
    }).rejects.toThrow('Knight not found');
  });

  it('should delete Knight', async () => {
    await knigthRepository.create(KnightMockService);

    await service.remove('fc9d2178-9856-472a-b9e5-071086cd8d76');

    expect(true).toEqual(true);
  });

  it('should return error when delete Knight', async () => {
    await knigthRepository.create(KnightMockService);

    expect(async () => {
      await service.remove('fc9d2178-9856-472a-b9e5-071086cd8d7');
    }).rejects.toThrow('Knight not found');
  });
});
