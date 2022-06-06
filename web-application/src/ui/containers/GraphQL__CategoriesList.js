import { useContext, useEffect } from "react";
import { nameSchema } from "../../validation-schemas/name";
import { percentageSchema } from "../../validation-schemas/percentage";
import CategoriesTable from "../components/CategoriesTable";
import { CategoriesContext } from "../context/CategoriesContext";

const GraphQL__CategoriesList = () => {
  const { categories, fetchCategories, updateCategory, deleteCategory } =
    useContext(CategoriesContext);

  useEffect(fetchCategories, []);

  const categoryEditted = (edittedCategory) => {
    const { id, field, value } = edittedCategory;

    updateCategory(id, { [field]: resolveValue(field, value) });
  };

  const categoryDeleteTriggered = (category) => {
    deleteCategory(category.id);
  };

  return (
    <CategoriesTable
      items={Object.values(categories)}
      onCategoryEdit={categoryEditted}
      onCategoryDelete={categoryDeleteTriggered}
    />
  );
};

export default GraphQL__CategoriesList;

const resolveValue = (field, value) => {
  switch (field) {
    case "percentage": {
      try {
        return percentageSchema.validateSync(Number.parseInt(value));
      } catch (error) {
        handleValidationError(error);
      }
      break;
    }
    case "name": {
      try {
        return nameSchema.validateSync(value);
      } catch (error) {
        handleValidationError(error);
      }
      break;
    }
    default:
      return value;
  }
};

const handleValidationError = (error) => {
  alert(error.message);
  throw error;
};
