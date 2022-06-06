import { useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import {
  CREATE_CATEOGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../graphql/mutations";
import { CATEGORIES } from "../../graphql/queries";

const initialContextValue = {
  categories: [],
  setCategories: () => {},
};

export const CategoriesContext = createContext(initialContextValue);

const CategoriesContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [fetchCategories, categoriesQuery] = useLazyQuery(CATEGORIES);
  const [createCategory, createCategoryMutation] =
    useMutation(CREATE_CATEOGORY);
  const [updateCategory, updateCategoryMutation] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory, deleteCategoryMutation] = useMutation(DELETE_CATEGORY);

  useEffect(() => {
    if (!categoriesQuery.loading && categoriesQuery.data) {
      if (categoriesQuery.data.categories.__typename === "CategoriesList") {
        setCategories(
          categoriesListToDictionary(categoriesQuery.data.categories.items)
        );
      } else {
        alert("Error when fetching categories.");
      }
    }
  }, [categoriesQuery.loading]);

  useEffect(() => {
    if (!createCategoryMutation.loading && createCategoryMutation.data) {
      const { createCategory } = createCategoryMutation.data;
      setCategories((prev) => ({
        ...prev,
        [createCategory.id]: createCategory,
      }));
    }
  }, [createCategoryMutation.loading]);

  useEffect(() => {
    if (!updateCategoryMutation.loading && updateCategoryMutation.data) {
      const { updateCategory } = updateCategoryMutation.data;
      setCategories((prev) => {
        return {
          ...prev,
          [updateCategory.id]: {
            ...prev[updateCategory.id],
            ...updateCategory,
          },
        };
      });
    }
  }, [updateCategoryMutation.loading]);

  useEffect(() => {
    if (!deleteCategoryMutation.loading && deleteCategoryMutation.data) {
      const { deleteCategory } = deleteCategoryMutation.data;
      setCategories((prev) => {
        const { [deleteCategory.id]: deletedCategory, ...rest } = prev;
        return rest;
      });
    }
  }, [deleteCategoryMutation.loading]);

  const value = {
    categories,
    fetchCategories: (pageNum = 0, pageSize = 100) => {
      fetchCategories({ variables: { input: { pageNum, pageSize } } });
    },
    createCategory: (input) => {
      createCategory({ variables: { input } });
    },
    updateCategory: (categoryId, categoryPatch) => {
      updateCategory({
        variables: { input: { categoryId, ...categoryPatch } },
      });
    },
    deleteCategory: (categoryId) => {
      deleteCategory({ variables: { categoryId } });
    },
  };

  return (
    <CategoriesContext.Provider value={value}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;

const categoriesListToDictionary = (categories) =>
  categories.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
