import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import {
  CategoriesResult,
  CreateCategoryInput,
  CreateCategoryResult,
  DeleteCategoryResult,
  PaginationInput,
  UpdateCategoryInput,
  UpdateCategoryResult,
} from './graphql';

@Resolver('Categories')
export default class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  queryCategory(
    @Args('input')
    input: PaginationInput,
  ): Promise<CategoriesResult> {
    console.log('input', input);
    return this.categoriesService.queryCategories(input);
  }

  @Mutation('createCategory')
  createCategory(
    @Args('input')
    input: CreateCategoryInput,
  ): Promise<CreateCategoryResult> {
    return this.categoriesService.createCategory(input);
  }

  @Mutation('updateCategory')
  updateCategory(
    @Args('input')
    input: UpdateCategoryInput,
  ): Promise<UpdateCategoryResult> {
    return this.categoriesService.updateCategory(input);
  }

  @Mutation('deleteCategory')
  deleteCategory(
    @Args('categoryId')
    categoryId: string,
  ): Promise<DeleteCategoryResult> {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
