import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KnightService } from './knight.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { Knight } from './entities/knight.entity';

@Controller('knight')
export class KnightController {
  constructor(private readonly knightService: KnightService) {}

  @Post()
  create(@Body() knight: CreateKnightDto) {
    return this.knightService.create(knight);
  }

  @Get()
  findAll() {
    return this.knightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knightService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() knight: UpdateKnightDto) {
    return this.knightService.update({ id }, knight);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knightService.delete(id);
  }
}
