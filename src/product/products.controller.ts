import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { IdValidationPipe } from 'src/pipes/add-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createProduct(@Body() dto: ProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Get('')
  async getProducts() {
    return await this.productService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.getById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(@Body() dto: ProductDto, @Param('id') id: string) {
    const updatedProduct = await this.productService.updateProduct(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException('product not found');
    }
    return updatedProduct;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id', IdValidationPipe) id: string) {
    const deleteProduct = await this.productService.deleteProduct(id);
    if (!deleteProduct) {
      throw new NotFoundException('product not found');
    }
    return deleteProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
