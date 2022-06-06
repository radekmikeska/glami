import { ResolveField } from '@nestjs/graphql';

export default class UnionResolver {
  @ResolveField()
  __resolveType(value) {
    if (!value) return null;

    return value.constructor.name;
  }
}
