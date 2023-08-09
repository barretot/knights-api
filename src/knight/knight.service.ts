import { Inject, Injectable } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { IKnightRepository } from './repository/knight-repository-interface';
@Injectable()
export class KnightService {
  constructor(
    @Inject('IKnightRepository')
    private knight: IKnightRepository,
  ) {}

  async create(props: CreateKnightDto) {
    const result = await this.knight.create(props);
    return result.id;
  }

  async findAll() {
    return this.knight.findAll();
  }

  async findOne(id: string): Promise<CreateKnightDto> {
    return this.knight.findOne(id);
  }

  async update({ id }, knight: UpdateKnightDto) {
    try {
      const findKnight = await this.knight.findOne(id);

      const result = await this.knight.update({ id: findKnight.id }, knight);

      return result;
    } catch (error) {
      return 'Unexpected Error';
    }
  }

  async delete(id: string) {
    const findKnight = await this.knight.findOne(id);

    return this.knight.delete(findKnight.id);
  }
}
