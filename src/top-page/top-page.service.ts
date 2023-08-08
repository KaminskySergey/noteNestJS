import { Injectable } from '@nestjs/common';
import { TopPageDto } from './dto/top-page.dto';
import { Model } from 'mongoose';
import { TopLevelCategory, TopPage, TopPageDocument } from './top-page.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: TopPageDto): Promise<TopPage> {
    const createTopPage = await this.topPageModel.create(dto);
    return createTopPage;
  }

  async getById(id: string): Promise<TopPage> {
    const topPage = await this.topPageModel.findById(id).exec();
    return topPage;
  }

  async findByAlias(alias: string): Promise<TopPage> {
    const aliasEl = await this.topPageModel.findOne({ alias }).exec();
    return aliasEl;
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    const category = await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      })
      .exec();
    return category;
  }

  async delete(id: string): Promise<TopPage> {
    const deleteTopPage = await this.topPageModel.findByIdAndDelete(id).exec();
    return deleteTopPage;
  }

  async update(id: string, dto: TopPageDto): Promise<TopPage> {
    const updateTopPage = await this.topPageModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    return updateTopPage;
  }
}
