import React from "react";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

//Component Imports

import Title from "./comp/title";
import CurrentlyReading from "./comp/currently.reading";
import WantToRead from "./comp/want.to.read";
import Read from "./comp/read";
import SearchBook from "./comp/search";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    books: [],
  };
  
}
  componentDidMount = async () => {
    await BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  handleChange(event) {
    this.updateShelf(event);
  }

  updateShelf = (event) => {
    console.log(event)
    this.setState({
      books: event,
    })
  }
  
  filterBooks(books, shelf) {
    return books.filter((book) => {
      return book.shelf.toLowerCase() === shelf;
    });
  }
  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div className="list-books">
                <Title />
                <div className="list-books-content">
                  <div>
                    <CurrentlyReading
                      books={this.filterBooks(
                        this.state.books,
                        "currentlyreading"
                      )}
                      onChange={(event) => this.handleChange(event)}
                    />
                    <WantToRead
                      books={this.filterBooks(this.state.books, "wanttoread")}
                      onChange={(event) => this.handleChange(event)}
                    />
                    <Read
                      books={this.filterBooks(this.state.books, "read")}
                      onChange={(event) => this.handleChange(event)}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/search" element={ <SearchBook onChange={(event) => this.handleChange(event)} />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
