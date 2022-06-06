import { Resolver } from '@nestjs/graphql';
import UnionResolver from './union-resolver';

@Resolver('DeleteCategoryResult')
export default class DeleteCategoryResultResolver extends UnionResolver {}
