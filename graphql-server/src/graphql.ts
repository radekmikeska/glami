/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PaginationInput {
  pageNum?: Nullable<number>;
  pageSize?: Nullable<number>;
}

export class CreateCategoryInput {
  name: string;
  percentage: number;
}

export class UpdateCategoryInput {
  categoryId: string;
  name?: Nullable<string>;
  percentage?: Nullable<number>;
}

export abstract class IQuery {
  abstract categories(
    input: PaginationInput,
  ): CategoriesResult | Promise<CategoriesResult>;
}

export abstract class IMutation {
  abstract createCategory(
    input: CreateCategoryInput,
  ): CreateCategoryResult | Promise<CreateCategoryResult>;

  abstract updateCategory(
    input: UpdateCategoryInput,
  ): UpdateCategoryResult | Promise<UpdateCategoryResult>;

  abstract deleteCategory(
    categoryId: string,
  ): DeleteCategoryResult | Promise<DeleteCategoryResult>;
}

export class CategoriesList {
  items: Category[];
  count: number;
  pageNum: number;
  pageSize: number;
}

export class Category {
  id: string;
  name: string;
  percentage: number;
}

export class PercentageOutOfRange {
  message: string;
  lowerBound: number;
  upperBound: number;
}

export class DocumentNotFound {
  message: string;
}

export class InternalError {
  code: number;
  message: string;
}

export type CreateCategoryResult =
  | Category
  | PercentageOutOfRange
  | InternalError;
export type UpdateCategoryResult =
  | Category
  | PercentageOutOfRange
  | DocumentNotFound
  | InternalError;
export type DeleteCategoryResult = Category | DocumentNotFound | InternalError;
export type CategoriesResult = CategoriesList | InternalError;
type Nullable<T> = T | null;
