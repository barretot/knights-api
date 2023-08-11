import { Module } from '@nestjs/common';
import { KnightService } from './knight.service';
import { KnightController } from './knight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightSchema } from './entities/knight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }]),
  ],
  controllers: [KnightController],
  providers: [KnightService],
})
export class KnightModule {}
