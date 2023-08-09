import { Test, TestingModule } from '@nestjs/testing';
import { KnightController } from './knight.controller';
import { KnightService } from './knight.service';

describe('KnightController', () => {
  let controller: KnightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightController],
      providers: [KnightService],
    }).compile();

    controller = module.get<KnightController>(KnightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
