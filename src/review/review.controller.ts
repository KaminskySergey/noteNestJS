import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { REVIEW_NOT_FOUND } from './review.constans';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorators';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: ReviewDto) {
    return this.reviewService.createReview(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEl = await this.reviewService.deleteReview(id);
    if (!deletedEl) {
      return new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedEl;
  }

  @UseGuards(JwtAuthGuard)
  @Get('product/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    console.log(email, '4444444444444444444444444');
    return this.reviewService.findByProductId(productId);
  }

  @Delete('product/:productId')
  async deleteByProduct(@Param('productId') productId: string) {
    return await this.reviewService.deleteByProductId(productId);
  }
}
