import { Resolver } from '@nestjs/graphql';
import UnionResolver from './union-resolver';

@Resolver('UpdateCategoryResult')
export default class UpdateCategoryResultResolver extends UnionResolver {}
