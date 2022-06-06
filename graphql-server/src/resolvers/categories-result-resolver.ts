import { Resolver } from '@nestjs/graphql';
import UnionResolver from './union-resolver';

@Resolver('CategoriesResult')
export default class CategoriesResultResolver extends UnionResolver {}
