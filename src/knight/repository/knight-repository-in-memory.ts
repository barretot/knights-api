import { IKnightRepository } from './knight-repository-interface';
import { Knight } from '../entities/knight.entity';

export class KnightRepositoryInMemory implements IKnightRepository {
  items: Knight[] = [];
  async create(knight: Knight): Promise<Knight> {
    this.items.push(knight);

    return knight;
  }

  async update({ id }, knight: Knight): Promise<Knight> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items[index].name = knight.name;

      return this.items[index];
    }
  }

  async findAll(): Promise<Knight[]> {
    return this.items;
  }

  async findOne(id: string): Promise<Knight> {
    const knight = this.items.find((item) => item.id === id);

    if (!knight) {
      throw new Error('Knight not found');
    }

    return knight;
  }

  async remove(id: string): Promise<boolean> {
    this.items.filter((item) => item['id'] !== id);

    return true;
  }
}
