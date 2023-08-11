import { Knight } from '../entities/knight.entity';

export interface IKnightGateway {
  create(knight: Knight): Promise<Knight>;
  updateOne(knight: Knight): Promise<Knight>;
  findAll(): Promise<Knight[]>;
  findOne(id: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}
