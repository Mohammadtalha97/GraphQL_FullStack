import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../../queries/queries";

//css
import "../../Assests/Main.css";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookGenre: "",
      authorId: "",
    };
  }
  displayAuthors = () => {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  handleChangeEvent = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.props.addBookMutation({
      //variavles
      variables: {
        name: this.state.bookName,
        genre: this.state.bookGenre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  render() {
    return (
      <div>
        <form id="add-book">
          <div className="field">
            <label>Book Name:</label>
            <input
              type="text"
              name="bookName"
              onChange={(e) => this.handleChangeEvent(e)}
            />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              name="bookGenre"
              onChange={(e) => this.handleChangeEvent(e)}
            />
          </div>

          <div className="field">
            <label>Authors:</label>
            <select name="authorId" onChange={(e) => this.handleChangeEvent(e)}>
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button onClick={(e) => this.handleClick(e)}>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
