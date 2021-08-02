import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class BookSearch extends React.Component {
  state = {
    inputText: "",
  };
  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
    this.props.search(e.target.value);
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        {this.state.inputText !== "" && (
          <div className="search-books-results">
            <Shelf
              name="Search results"
              books={this.props.searchBooks.map((book) => {
                let shelf;
                const checkBookName = (obj) => {
                  shelf = obj.shelf;
                  return obj.id === book.id;
                };

                if (this.props.savedBooks.some(checkBookName)) {
                  book.shelf = shelf;
                }
                return book;
              })}
              savedBooks={this.props.savedBooks}
              updateBook={this.props.updateBook}
            />
          </div>
        )}
      </div>
    );
  }
}

export default BookSearch;
