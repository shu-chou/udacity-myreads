import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  searchForBook(query){
     this.setState(() => ({
        query: query
     }))
  }

  render() {
    const { query } = this.state
    const { books } = this.props
    const result = books.filter((book)=> {
      return (book.title.toLowerCase().includes(query.toLowerCase()) || book.authors.toString().toLowerCase().includes(query.toLowerCase()))
    })
    console.log(result)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.searchForBook(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.map((book) => (
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
                        value={book.shelf}
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

export default SearchBook;
