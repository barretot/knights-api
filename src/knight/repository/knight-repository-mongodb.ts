import { InjectModel } from '@nestjs/mongoose';
import { IKnightRepository } from './knight-repository-interface';
import { KnightMongoSchema } from '../entities/knight.schema';
import { Model } from 'mongoose';
import { Knight } from '../entities/knight.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KnightRepositoryMongoDb implements IKnightRepository {
  constructor(
    @InjectModel('Knight')
    private readonly knightModel: Model<KnightMongoSchema>,
  ) {}

  async create(props: Knight): Promise<Knight> {
    const knight = (await this.knightModel.create(props)).save();

    if (!knight) {
      throw new Error('Create Error');
    }

    return props;
  }

  async update({ id }, knight: Knight): Promise<Knight> {
    const findKnight = await this.knightModel.findById(id);

    await this.knightModel.updateOne({ _id: findKnight._id }, knight);

    return knight;
  }

  async findAll(): Promise<Knight[]> {
    return this.knightModel.find().exec();
  }

  async findOne(id: string): Promise<Knight> {
    return this.knightModel.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteKnight = await this.knightModel.findByIdAndDelete(id);

    if (!deleteKnight) {
      throw new Error('Delete Error');
    }

    return true;
  }
}
