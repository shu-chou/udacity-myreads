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
    this.updateMyReads(event);
  }

  updateShelf = (event) => {
    let arrBooks = this.state.books;
    let bookIndex = arrBooks.findIndex((book) => book.id === event.target.name);
    arrBooks[bookIndex].shelf = event.target.value;
    this.setState(() => ({
      books: arrBooks,
    }));
  }

  updateMyReads = (event) => {
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
                      books={this.filterBooks(this.state.books, "currentlyreading")}
                      onChange={(event) => this.updateShelf(event)}
                    />
                    <WantToRead
                      books={this.filterBooks(this.state.books, "wanttoread")}
                      onChange={(event) => this.updateShelf(event)}
                    />
                    <Read
                      books={this.filterBooks(this.state.books, "read")}
                      onChange={(event) => this.updateShelf(event)}
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
          <Route path="/search" element={ <SearchBook myReads={this.state.books} onChange={(event) => this.handleChange(event)} />} />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
