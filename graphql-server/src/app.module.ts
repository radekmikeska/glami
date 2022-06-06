import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { BiddingValidator } from './bidding-validator';
import CategoriesResolver from './categories-resolver';
import { CategoriesService } from './categories.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryFactory } from './factories/category.factory';
import { ErrorFactory } from './factories/error.factory';
import { PercentageOutOfRangeFactory } from './factories/percentage-out-of-range.factory';
import CategoriesResultResolver from './resolvers/categories-result-resolver';
import CreateCategoryResultResolver from './resolvers/create-category-result.resolver';
import UpdateCategoryResultResolver from './resolvers/update-category-result.resolver';
import DeleteCategoryResultResolver from './resolvers/delete-category-result.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      dbName: process.env.MONGO_DATABASE,
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [
    CategoriesResolver,
    CategoriesService,
    BiddingValidator,
    CategoriesResultResolver,
    CreateCategoryResultResolver,
    UpdateCategoryResultResolver,
    DeleteCategoryResultResolver,
    CategoryFactory,
    ErrorFactory,
    PercentageOutOfRangeFactory,
  ],
})
export class AppModule {}
