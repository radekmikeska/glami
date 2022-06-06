import styled from "@emotion/styled";
import GraphQL__CategoriesList from "../containers/GraphQL__CategoriesList";
import GraphQL__CreateCategory from "../containers/GraphQL__CreateCategory";
import CategoriesContextProvider from "../context/CategoriesContext";

const CategoriesScene = () => {
  return (
    <CategoriesContextProvider>
      <Container>
        <div>
          <GraphQL__CreateCategory />
        </div>
        <TableContainer>
          <GraphQL__CategoriesList />
        </TableContainer>
      </Container>
    </CategoriesContextProvider>
  );
};

export default CategoriesScene;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TableContainer = styled.div`
  padding-top: 20px;
  width: 80%;
  max-width: 500px;
`;
