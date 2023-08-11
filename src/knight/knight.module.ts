import { Module } from '@nestjs/common';
import { KnightService } from './knight.service';
import { KnightController } from './knight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightSchema } from './entities/knight.schema';
import { KnightRepositoryMongoDb } from './repository/knight-repository-mongodb';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }]),
  ],
  controllers: [KnightController],
  providers: [
    KnightService,
    KnightRepositoryMongoDb,
    {
      provide: 'IKnightRepository',
      useExisting: KnightRepositoryMongoDb,
    },
  ],
})
export class KnightModule {}
