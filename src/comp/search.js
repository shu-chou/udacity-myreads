import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//Import API
import * as BooksAPI from '../utils/BooksAPI'

//Import functions
import * as Funclib from '../utils/func'

class SearchBook extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      result: [],
      myreads: props.myReads,
     };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
   BooksAPI.update(event.target.name, event.target.value) 
   this.updateBook(event.target.name, event.target.value)
  }

  updateBook = async (book, shelf) => {
    let movedBook = {}
    const bookExists = Funclib.findInMyReads(book, this.state.myreads)
    if(bookExists.length !== 0)
      {
        movedBook = Funclib.updateBookShelf(book, shelf, this.state.myreads)
      } 
    else {
        movedBook = await BooksAPI.get(book)
        movedBook.shelf = shelf
      }
    this.setState(prevState => ({
      myreads: [...prevState.myreads, movedBook]
    }))
    this.props.onChange(this.state.myreads)
  }

  searchForBook = async (query)=>{
    let books = []
    if(query){
      const res = await BooksAPI.search(query)
      if (res === undefined){
        books = []
      }else if ("error" in res) {
        books = []
      } else {
        books = res.map((book) => {
          const bookExists = Funclib.findInMyReads(book.id, this.state.myreads)
          if(bookExists.length !== 0)
          {
            book = bookExists[0]
          }
          if(!('imageLinks' in book)){
              Object.assign(book, {imageLinks: {thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/128px-No-Image-Placeholder.svg.png'}})
            }
          return book
        })
      }
    }else {
       books = [] 
    }

    this.setState({ result: books}) 
  }

  render() {
    const { result } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchForBook(event.target.value)}/>
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
                        value={book.shelf? book.shelf: 'move'}
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
