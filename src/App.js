import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

class BooksApp extends React.Component {
  state = {
    bookList: [],
    searchResults: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((bookList) => {
      return this.setState({ bookList });
    });
  }

  updateBook = (book, shelf) => {
    const isBookInLib = this.isBookinMyLib(book.id);

    if (!isBookInLib) {
      this.addBook(book, shelf);
    }

    BooksAPI.update(
      {
        id: book.id,
      },
      shelf
    ).then(
      this.setState((prevState) => ({
        bookList: prevState.bookList.filter((b) => {
          if (b.id === book.id) {
            return (b.shelf = shelf);
          } else {
            return b;
          }
        }),
      }))
    );
  };

  isBookinMyLib = (book) => {
    const checkBookName = (obj) => obj.id === book;
    if (this.state.bookList.some(checkBookName)) {
      return true;
    }
    return false;
  };
  addBook = (book, shelf) => {
    BooksAPI.get(book.id).then((book) => {
      book.shelf = shelf;
      this.setState((currentState) => ({
        bookList: [...currentState.bookList, book],
      }));
    });
  };

  searchBook = (query) => {
    if (query) {
      BooksAPI.search(query).then((bookSearch) => {
        if (bookSearch.error) {
          console.log("no books found");
          this.setState({ searchResults: [] });
        } else {
          this.setState({
            searchResults: bookSearch,
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.bookList}
              updateBook={this.updateBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              searchBooks={this.state.searchResults}
              savedBooks={this.state.bookList}
              search={this.searchBook}
              updateBook={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
