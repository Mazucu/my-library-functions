import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

function BooksApp(props) {
  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const bookList = await BooksAPI.getAll();
    setBookList(bookList);
  }, []);

  const updateBook = (book, shelf) => {
    const isBookInLib = isBookinMyLib(book.id);
    if (!isBookInLib) {
      addBook(book, shelf);
    }

    BooksAPI.update(
      {
        id: book.id,
      },
      shelf
    ).then(
      setBookList(
        bookList.filter((b) => {
          if (b.id === book.id) {
            return (b.shelf = shelf);
          } else {
            return b;
          }
        })
      )
    );
  };

  const isBookinMyLib = (book) => {
    const checkBookName = (obj) => obj.id === book;
    if (bookList.some(checkBookName)) {
      return true;
    }
    return false;
  };
  const addBook = async (book, shelf) => {
    const bookDetails = await BooksAPI.get(book.id);
    bookDetails.shelf = shelf;
    setBookList([...bookList, bookDetails]);
  };

  const searchBook = (query) => {
    if (query) {
      BooksAPI.search(query).then((bookSearch) => {
        if (bookSearch.error) {
          console.log("no books found");
          setSearchResults([]);
        } else {
          setSearchResults(bookSearch);
        }
      });
    }
  };

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => <BookList books={bookList} updateBook={updateBook} />}
      />
      <Route
        path="/search"
        render={() => (
          <BookSearch
            searchBooks={searchResults}
            savedBooks={bookList}
            search={searchBook}
            updateBook={updateBook}
          />
        )}
      />
    </div>
  );
}

export default BooksApp;
