import { Knight } from '../entities/knight.entity';

export interface IKnightRepository {
  create(knight: Knight): Promise<Knight>;
  update({ id }, knight: Knight): Promise<Knight>;
  findAll(): Promise<Knight[]>;
  findOne(id: string): Promise<Knight>;
  remove(id: string): Promise<boolean>;
}
