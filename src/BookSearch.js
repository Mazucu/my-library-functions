import React, { useState } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function BookSearch(props) {
  const [inputText, setInputText] = useState("");
  let noResult = false;
  props.searchBooks.length === 0 ? (noResult = true) : (noResult = false);

  const handleChange = (e) => {
    setInputText(e.target.value);
    props.search(e.target.value);
  };

  const isBookInMyLib = (book) => {
    const checkBookName = (obj) => {
      return obj.id === book.id;
    };
    if (props.savedBooks.some(checkBookName)) {
      return true;
    }
    return false;
  };
  const getShelf = (book) => {
    const bookShelf = props.savedBooks.find(
      (savedBook) => savedBook.id === book.id
    ).shelf;
    return bookShelf;
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" />

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={handleChange}
          />
        </div>
      </div>
      {inputText !== "" && (
        <div className="search-books-results">
          <Shelf
            name="Search results"
            books={props.searchBooks.map((book) => {
              if (isBookInMyLib(book)) {
                book.shelf = getShelf(book);
              } else {
                book.shelf = "none";
              }
              return book;
            })}
            updateBook={props.updateBook}
          />

          {noResult && <h3>No results for this search</h3>}
        </div>
      )}
    </div>
  );
}
/** 
class BookSearch extends React.Component {
  state = {
    inputText: "",
  };
  handleChange = (e) => {
    this.setState({ inputText: e.target.value });
    this.props.search(e.target.value);
  };

  isBookInMyLib = (book) => {
    const checkBookName = (obj) => {
      return obj.id === book.id;
    };
    if (this.props.savedBooks.some(checkBookName)) {
      return true;
    }
    return false;
  };
  getShelf = (book) => {
    const bookShelf = this.props.savedBooks.find(
      (savedBook) => savedBook.id === book.id
    ).shelf;
    return bookShelf;
  };

  render() {
    let noResult = false;
    this.props.searchBooks.length === 0
      ? (noResult = true)
      : (noResult = false);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />

          <div className="search-books-input-wrapper">
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
                if (this.isBookInMyLib(book)) {
                  book.shelf = this.getShelf(book);
                } else {
                  book.shelf = "none";
                }
                return book;
              })}
              updateBook={this.props.updateBook}
            />

            {noResult && <h3>No results for this search</h3>}
          </div>
        )}
      </div>
    );
  }
}
*/
export default BookSearch;
