import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
  ],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
