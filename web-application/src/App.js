import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CategoriesScene from "./ui/CategoriesScene";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CategoriesScene />
    </ApolloProvider>
  );
}

export default App;
