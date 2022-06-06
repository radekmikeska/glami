import { Resolver } from '@nestjs/graphql';
import UnionResolver from './union-resolver';

@Resolver('CreateCategoryResult')
export default class CreateCategoryResultResolver extends UnionResolver {}
