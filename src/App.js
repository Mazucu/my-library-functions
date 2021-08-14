import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

function BooksApp() {
  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // the callback effect function cannot be async, this is how you do it:
    async function getBooks() {
      // using async/await you have to wrap the call in try/catch to not crash the app in case you have a bad result
      // for example you can show an error message in the catch block
      try {
        const bookList = await BooksAPI.getAll();
        setBookList(bookList);
      } catch(error) {
        console.log(error)
        // setError(error.message)
      }
    }

    getBooks()
  }, []);

  const updateBook = (book, shelf) => {
    const isBookInLib = isBookinMyLib(book.id);
    if (!isBookInLib) {
      addBook(book, shelf);
    }

    BooksAPI.update({ id: book.id }, shelf).then(
      setBookList(
        bookList.filter(_book => {
          if (_book.id === book.id) {
            return (_book.shelf = shelf);
          }

          // no need to say else because the function will quit if the "if" is fulfuilled
          return _book;
        })
      )
    );
  };

  const isBookinMyLib = (book) => {
    return bookList.some((_book) => _book.id === book) // you were duplication what .some() already does
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
      <Route exact path="/">
        <BookList books={bookList} updateBook={updateBook} />
      </Route>
      <Route path="/search"/>
        <BookSearch
          searchBooks={searchResults}
          savedBooks={bookList}
          search={searchBook}
          updateBook={updateBook}
        />
      </Route>
    </div>
  );
}

export default BooksApp;
