import { Category } from 'src/graphql';
import { CategoryDocument } from 'src/schemas/category.schema';

export class CategoryFactory {
  fromDocument(categoryDocument: CategoryDocument): Category {
    const category = new Category();
    category.id = categoryDocument._id;
    category.name = categoryDocument.name;
    category.percentage = categoryDocument.percentage;

    return category;
  }

  fromManyDocuments(categoriesDocuments: CategoryDocument[]): Category[] {
    return categoriesDocuments.map((categoryDocument) =>
      this.fromDocument(categoryDocument),
    );
  }
}
