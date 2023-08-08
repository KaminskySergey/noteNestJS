import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

class HhData {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;

  @IsString()
  updateAt: Date;
}

class TopPageAdvantage {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class TopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  metaTitle: string;

  @IsString()
  metaDescription: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhData)
  hh?: HhData;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages?: TopPageAdvantage[];

  @IsString()
  @IsOptional()
  seoText?: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
