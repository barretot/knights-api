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

  const knightId = 'fc9d2178-9856-472a-b9e5-071086cd8d76';

  it('should create Knight', async () => {
    const knight = await service.create(KnightMock);

    expect(knigthRepository.items[0]).toEqual(knight);
  });

  it('should update Knight', async () => {
    const knigth = {
      ...KnightMock,
      name: 'Jett Name Update',
      nickname: 'King of update',
    };

    await knigthRepository.create(KnightMock);

    const updatedKnight = await service.update({ id: knightId }, knigth);

    expect(knigthRepository.items[0]).toEqual(updatedKnight);
  });

  it('should listAll Knight', async () => {
    await knigthRepository.create(KnightMock);

    const allKnigths = await service.findAll();

    console.log(allKnigths);

    expect(knigthRepository.items[0]).toEqual(allKnigths[0]);
  });

  it('should findOne Knight', async () => {
    await knigthRepository.create(KnightMock);

    const allKnigths = await service.findAll();

    console.log(allKnigths);

    expect(knigthRepository.items[0]).toEqual(allKnigths[0]);
  });
});
