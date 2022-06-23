import React, { Component } from "react";

class Read extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "read" };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event);
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        name={book.id}
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Read;
