import React from "react";
import "./App.css";
import Book from "./Book";

class Shelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => {
              return (
                <li key={book.id}>
                  <Book
                    name={book.title}
                    author={book.authors}
                    url={book.imageLinks.smallThumbnail}
                    id={book.id}
                    shelf={book.shelf}
                    savedBooks={this.props.savedBooks}
                    updateBook={this.props.updateBook}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
