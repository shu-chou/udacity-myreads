
# MyReads

The My Reads App allows you to track books and place them on one of three bookshelves.


## Features

- Read
- Currently Reading
- Want to Read
- Search for Books


## About Stack

The app is built upon React.js V16.6.3, and uses a BooksAPI to fetch and update Book Data.
## Backend

App uses BooksAPI to make backend GET and POST requests.
## Frontend

Frontend is built using React v16.6 and uses React Router to enable routing in the app. 

Folder structure:

- `App.js:` This is the home component which renders different views based on the route or conditions
- `read.js:` This view is use to render the books user read. The user can toggle the bookshelf by clicking on the options to move the book to a different shelf.
- `current.reading.js:` This view is use to render the books user is currently reading. The user can toggle the bookshelf by clicking on the options to move the book to a different shelf.
- `want.to.read.js:` This view is use to render the books user wants to read. The user can toggle the bookshelf by clicking on the options to move the book to a different shelf
- `search.js:` This view is use to search for a particular book. This view display all the books when the search query is empty. The user can search for a book based on its author or title.


## Installation

Fork, Clone or Copy and open terminal/command prompt/powershell in the program directory

Navigate to project directory

```bash
  cd MyReads
```
    
Install the dependencies via npm
```bash
  npm install 
```

Run the app
```bash
  npm start
```

The app open on localhost:3000 by default, in the browser type or go to http://localhost/3000 to open the app.


## API Reference

BooksAPI is used to make all the backend requests.

Available methods

- `getall`
- `update`
- `search`


#### Get all books

```http
  GET /api/books
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization token` | `string` | **Required**. Provide a authorization token in the header of the request|

#### Update a book

```http
  PUT /api/books/${book.id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to update |


#### Search for a book

```http
  POST /api/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. Query string which will look for a book with matching author or title in the database |

## Authors

- [@shu-chou](https://github.com/shu-chou)


## Acknowledgements

 - Udacity's React Fundamental course instructor [@Tyler McGinnis](https://github.com/tylermcginnis)
 - Program mentor Ujjawal Sharma, and all the program batchmates

