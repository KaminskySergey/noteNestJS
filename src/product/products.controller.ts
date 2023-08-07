import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async createProduct(@Body() dto: ProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Get('')
  async getProducts() {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  @Patch(':id')
  async updateProduct(@Body() dto: ProductDto, @Param('id') id: string) {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
