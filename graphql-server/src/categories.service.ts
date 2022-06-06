import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CategoriesList,
  CategoriesResult,
  CreateCategoryInput,
  CreateCategoryResult,
  DeleteCategoryResult,
  PaginationInput,
  UpdateCategoryInput,
  UpdateCategoryResult,
} from './graphql';
import {
  Category as CategorySchema,
  CategoryDocument,
} from 'src/schemas/category.schema';
import { Model } from 'mongoose';
import { CategoryFactory } from './factories/category.factory';
import { ErrorFactory } from './factories/error.factory';
import { PercentageOutOfRangeFactory } from './factories/percentage-out-of-range.factory';
import { BiddingValidator } from './bidding-validator';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryFactory: CategoryFactory,
    private readonly errorFactory: ErrorFactory,
    private readonly percentageOutOfRangeFactory: PercentageOutOfRangeFactory,
    private readonly biddingValidator: BiddingValidator,
    @InjectModel(CategorySchema.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async queryCategories(
    paginationInput: PaginationInput,
  ): Promise<CategoriesResult> {
    try {
      const { pageNum, pageSize } = paginationInput;
      const categories = await this.categoryModel
        .find()
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec();

      const list = new CategoriesList();
      list.items = this.categoryFactory.fromManyDocuments(categories);
      list.count = categories.length;
      list.pageNum = pageNum;
      list.pageSize = pageSize;

      return list;
    } catch (error) {
      console.log('error', error);
      return this.errorFactory.internalError();
    }
  }

  async createCategory(
    input: CreateCategoryInput,
  ): Promise<CreateCategoryResult> {
    try {
      if (!this.biddingValidator.validate(input.percentage)) {
        return this.percentageOutOfRangeFactory.create();
      }

      const newCategory = new this.categoryModel();
      newCategory.name = input.name;
      newCategory.percentage = input.percentage;
      const savedCategory = await newCategory.save();

      if (!savedCategory)
        return this.errorFactory.create(500, 'Error when saving category.');

      return this.categoryFactory.fromDocument(savedCategory);
    } catch (error) {
      console.log(error);
      return this.errorFactory.internalError();
    }
  }

  async updateCategory(
    input: UpdateCategoryInput,
  ): Promise<UpdateCategoryResult> {
    try {
      const { categoryId, ...patch } = input;
      if (
        patch.percentage !== undefined &&
        !this.biddingValidator.validate(patch.percentage)
      ) {
        return this.percentageOutOfRangeFactory.create();
      }

      const updatedCategory = await this.categoryModel
        .findOneAndUpdate({ _id: categoryId }, { ...patch }, { new: true })
        .exec();

      if (!updatedCategory)
        return this.errorFactory.documentNotFound('Category does not exist.');

      return this.categoryFactory.fromDocument(updatedCategory);
    } catch (error) {
      console.log(error);
      return this.errorFactory.internalError();
    }
  }

  async deleteCategory(_id: string): Promise<DeleteCategoryResult> {
    try {
      const deletedCategory = await this.categoryModel
        .findOneAndDelete({ _id })
        .exec();

      if (!deletedCategory)
        return this.errorFactory.documentNotFound('Category does not exist.');

      return this.categoryFactory.fromDocument(deletedCategory);
    } catch (error) {
      console.log(error);
      return this.errorFactory.internalError();
    }
  }
}
