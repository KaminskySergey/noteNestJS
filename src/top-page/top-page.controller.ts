import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { TopPageDto } from './dto/top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('')
  async create(@Body() dto: TopPageDto) {
    return await this.topPageService.create(dto);
  }

  @Get('')
  async getAll() {
    return await this.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.topPageService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.topPageService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TopPageDto) {
    return await this.topPageService.update(id, dto);
  }
}
