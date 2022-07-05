//Common Functions

export const findInMyReads = (bookId, myReads) => {
    const book = myReads.filter(book =>  book.id === bookId)
    return book
}

export const updateBookShelf = (bookId, shelf, myReads) => {
    const books =  myReads.map((book) => {
        if(book.id === bookId){
            book.shelf = shelf
        }
        return book
    })
    return books
}

