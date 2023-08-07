import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './review.model';
import { ReviewDto } from './dto/review.dto';
import { DeleteResult } from 'mongodb';
import { REVIEW_NOT_FOUND } from './review.constans';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(dto: ReviewDto): Promise<Review> {
    const createReview = await this.reviewModel.create(dto);
    return createReview;
  }

  async deleteReview(id: string): Promise<Review | null> {
    const allReview = await this.reviewModel.findByIdAndDelete(id);
    return allReview;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    const productById = await this.reviewModel.find({
      productId: new Types.ObjectId(productId),
    });
    return productById;
  }

  public async deleteByProductId(
    productId: string,
  ): Promise<DeleteResult | HttpException> {
    const deleteReview = this.reviewModel.deleteMany({ productId });
    if (!deleteReview) {
      return new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
