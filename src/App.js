import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//component
import BookList from "./component/book/BookList";
import AddBook from "./component/book/AddBook";

//css
import "./Assests/App.css";

//apollo-client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>GraphQL</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
//npm i apollo-boost react-apollo graphql --save
