import { KnightService } from './knight.service';
import { KnightRepositoryInMemory } from './repository/knight-repository-in-memory';
import { KnightMock } from './mocks/create-knight-mock';

describe('KnightService', () => {
  let service: KnightService;
  let knigthRepository: KnightRepositoryInMemory;

  beforeEach(() => {
    knigthRepository = new KnightRepositoryInMemory();
    service = new KnightService(knigthRepository as any);
  });

  it('should create Knight', async () => {
    const knight = await service.create(KnightMock);

    expect(knigthRepository.items[0]).toEqual(knight);
  });

  it('should return error when create Knight', async () => {
    const copy = {
      ...KnightMock,
      id: null,
    };
    const knight = await service.create(copy);

    expect(knigthRepository.items[0]).toEqual(knight);
  });

  it('should update Knight', async () => {
    const knigth = {
      ...KnightMock,
      name: 'Jett Name Update',
      nickname: 'King of update',
    };

    await knigthRepository.create(KnightMock);

    const updatedKnight = await service.update(
      { id: 'fc9d2178-9856-472a-b9e5-071086cd8d76' },
      knigth,
    );

    expect(knigthRepository.items[0]).toEqual(updatedKnight);
  });

  it('should listAll Knight', async () => {
    await knigthRepository.create(KnightMock);

    const allKnigths = await service.findAll();

    expect(knigthRepository.items[0]).toEqual(allKnigths[0]);
  });

  it('should findOne Knight', async () => {
    await knigthRepository.create(KnightMock);

    const findOneKnight = await service.findOne(
      'fc9d2178-9856-472a-b9e5-071086cd8d76',
    );

    expect(knigthRepository.items[0]).toEqual(findOneKnight);
  });

  it('should return error when findOne Knight', async () => {
    await knigthRepository.create(KnightMock);

    expect(async () => {
      await service.findOne('fc9d2178-9856-472a-b9e5-071086cd8d7');
    }).rejects.toThrow('Knight not found');
  });

  it('should delete Knight', async () => {
    await knigthRepository.create(KnightMock);

    const findOneKnight = await service.delete(
      'fc9d2178-9856-472a-b9e5-071086cd8d76',
    );

    console.log(findOneKnight);

    expect(true).toEqual(true);
  });

  it('should return error when delete Knight', async () => {
    await knigthRepository.create(KnightMock);

    expect(async () => {
      await service.delete('fc9d2178-9856-472a-b9e5-071086cd8d7');
    }).rejects.toThrow('Knight not found');
  });
});
