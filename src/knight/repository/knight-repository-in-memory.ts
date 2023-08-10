import { IKnightRepository } from './knight-repository-interface';
import { Knight } from '../entities/knight.entity';

export class KnightRepositoryInMemory implements IKnightRepository {
  items: Knight[] = [];
  async create(knight: Knight): Promise<Knight> {
    knight.id = this.items.length + 'fc9d2178-9856-472a-b9e5-071086cd8d76';

    this.items.push(knight);

    return knight;
  }

  async update({ id }, knight: Knight): Promise<Knight> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items[index].name = knight.name;

      return this.items[index];
    }

    return undefined;
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

  async delete(id: string): Promise<boolean> {
    const knight = this.items.filter((item) => item['id'] !== id);

    if (!knight) {
      return false;
    }

    return true;
  }
}
