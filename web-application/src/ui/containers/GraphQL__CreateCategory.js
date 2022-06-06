import { useContext } from "react";
import CreateCategoryForm from "../components/CreateCategoryForm";
import { CategoriesContext } from "../context/CategoriesContext";

const GraphQL__CreateCategory = () => {
  const { createCategory } = useContext(CategoriesContext);

  return <CreateCategoryForm onSubmit={createCategory} />;
};

export default GraphQL__CreateCategory;
