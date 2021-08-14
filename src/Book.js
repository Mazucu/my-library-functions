import React, { useState } from "react";

function Book({ updateBook, id, url, name, author }) {
  const [bookShelf, setBookShelf] = useState("");

  const handleChange = (event) => {
    updateBook({ id }, event.target.value);
    setBookShelf(event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: "url(" + url + ")",
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={shelf || bookShelf}
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
      <div className="book-title">{name}</div>
      <div className="book-authors">{author}</div>
    </div>
  );
}

export default Book;
