import { from } from "apollo-boost";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries/queries";

//componenets
import BookDetails from "./BookDetails";
//css
import "../../Assests/Main.css";

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }
  displatBooks = () => {
    let data = this.props.data;
    if (data.loading) {
      return <div>loading books</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <ul id="book-list">{this.displatBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
