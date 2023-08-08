import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { TopPageDto } from './dto/top-page.dto';
import { IdValidationPipe } from 'src/pipes/add-validation.pipe';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constans';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() dto: TopPageDto) {
    return await this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.getById(id);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletePage = await this.topPageService.delete(id);
    if (!deletePage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return deletePage;
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageDto,
  ) {
    const updatePage = await this.topPageService.update(id, dto);
    if (!updatePage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return updatePage;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: TopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
