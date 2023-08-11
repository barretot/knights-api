import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from './knight/knight.module';
import { config } from './config/configuration';
@Module({
  imports: [MongooseModule.forRoot(config.database.mongo.uri), KnightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
