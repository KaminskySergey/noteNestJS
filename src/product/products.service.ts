import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.model';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: ProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(dto);
    return newProduct;
  }

  async getAll(): Promise<Product[]> {
    const allProducts = await this.productModel.find();
    return allProducts;
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async updateProduct(id: string, dto: ProductDto): Promise<Product> {
    const updateProduct = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updateProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    const deleteProduct = await this.productModel.findByIdAndDelete(id);
    return deleteProduct;
  }
}
