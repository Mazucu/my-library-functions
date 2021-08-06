import React, { useState } from "react";
import "./App.css";

function Book(props) {
  const [bookShelf, setBookShelf] = useState("");

  const handleChange = (e) => {
    props.updateBook(
      {
        id: props.id,
      },
      e.target.value
    );
    setBookShelf(e.target.value);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: "url(" + props.url + ")",
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={props.shelf ? props.shelf : bookShelf}
            onChange={handleChange}
          >
            <option value="" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.name}</div>
      <div className="book-authors">{props.author}</div>
    </div>
  );
}
/*
class Book extends React.Component {
  state = {
    bookShelf: "",
  };
  handleChange = (e) => {
    this.props.updateBook(
      {
        id: this.props.id,
      },
      e.target.value
    );
    this.setState({ bookShelf: e.target.value });
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + this.props.url + ")",
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.props.shelf ? this.props.shelf : this.state.bookShelf}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.name}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    );
  }
}
*/
export default Book;
