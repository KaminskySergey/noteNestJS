import { Injectable } from '@nestjs/common';
import { TopPageDto } from './dto/top-page.dto';
import { Model } from 'mongoose';
import { TopPage, TopPageDocument } from './top-page.model';
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

  async getAll(): Promise<TopPage[]> {
    const getAlltopPage = await this.topPageModel.find();
    return getAlltopPage;
  }

  async getById(id: string): Promise<TopPage> {
    const topPage = await this.topPageModel.findById(id);
    return topPage;
  }

  async delete(id: string): Promise<TopPage> {
    const deleteTopPage = await this.topPageModel.findByIdAndDelete(id);
    return deleteTopPage;
  }

  async update(id: string, dto: TopPageDto): Promise<TopPage> {
    const updateTopPage = await this.topPageModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updateTopPage;
  }
}
