import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from './knight/knight.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://generic_user:78912312@study-cluster.elratus.mongodb.net/?retryWrites=true&w=majority',
    ),
    KnightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
