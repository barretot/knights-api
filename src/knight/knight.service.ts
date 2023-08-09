import { Injectable } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { KnightMongoSchema } from './entities/knight.schema';
import { Model } from 'mongoose';

@Injectable()
export class KnightService {
  constructor(
    @InjectModel('Knight')
    private readonly knightModel: Model<KnightMongoSchema>,
  ) {}

  async create(props: CreateKnightDto) {
    const result = await new this.knightModel(props).save();
    return result.id;
  }

  async findAll(): Promise<KnightMongoSchema[]> {
    return this.knightModel.find().exec();
  }

  async findOne(id: string): Promise<boolean> {
    return this.knightModel.findById(id);
  }

  async update(id: string, knight: UpdateKnightDto) {
    try {
      const findKnight = await this.knightModel.findById(id);

      // Use the found document's _id to perform the update
      const result = await this.knightModel.updateOne(
        { _id: findKnight._id },
        knight,
      );

      return result;
    } catch (error) {
      return 'Unexpected Error';
    }
  }

  async remove(id: string) {
    const deleteKnight = await this.knightModel.findByIdAndDelete(id);

    if (!deleteKnight) {
      return 'Error';
    }

    return 'Success';
  }
}
