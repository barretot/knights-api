import { Test, TestingModule } from '@nestjs/testing';
import { KnightService } from './knight.service';

/* 
Teste de unidade desconsidera agentes externos
*/

const mockKnight = {
  create: Promise.resolve(),
};

describe('KnightService', () => {
  let service: KnightService;

  beforeEach(() => {
    service = new KnightService(mockKnight as any);
  });

  it('Deve criar uma lista', async () => {
    service.create({
      name: 'Create Test',
      nickname: 'test',
      birthday: 'test',
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
  });
});

// let service: KnightService;
// beforeEach(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [KnightService],
//   }).compile();
//   service = module.get<KnightService>(KnightService);
// });
// it('should be defined', () => {
//   expect(service).toBeDefined();
// });
