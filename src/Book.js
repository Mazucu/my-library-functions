import React from "react";
import "./App.css";

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
    //console.log(this.props.id, e.target.value);
  };

  getShelf = () => {
    console.log("getShelf");
    return "wantToRead";
    /*this.props.savedBooks.filter((savedBook) => {
      if (savedBook.id === bookID) {
        console.log(savedBook.shelf);
        //this.props.shelf = savedBook.shelf;
        this.setState({ bookShelf: savedBook.shelf });
        //return this.state.bookShelf;
      }
      return "none";
    });*/
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
        <div className="book-authors">
          {this.props.author}

          {/*           {this.props.author.length > 1
            ? this.props.author.map((author) => author + " ")
            : this.props.author} */}
        </div>
      </div>
    );
  }
}

export default Book;
