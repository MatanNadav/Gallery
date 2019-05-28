'use strict';

var gBooks;

function createBooks() {
    console.log('Book created')
    var books = [
        createBook('Inflatables'),
        createBook('Trampoline'),
        createBook('Pop-up'),
        createBook('Heros'),
        {
            name: 'Tester',
            author: 'C.Ronaldo',
            id: 1,
            price: 101,
            rating: '7',
            imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Book_stub_img.svg/300px-Book_stub_img.svg.png'
        }
    ]
    gBooks = books;
}


function createBook(txt) {
    var book = {
        name: txt,
        author: getBookAuthor(),
        id: makeId(),
        price: getRandomInt(30, 200) + '$',
        rating: getRandomInt(1, 11),
        imgUrl: getBookUrl(),
    }
    return book;
}

function deleteBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return (
            book.id === bookId
        )
    })
    if (idx !== -1) gBooks.splice(idx, 1)
}

function addBook(name, price) {
    var newBook = {
        name: name,
        author: getBookAuthor(),
        id: makeId(),
        price: price + '$',
        rating: getRandomInt(1, 11),
        imgUrl: getBookUrl(),
    }
    gBooks.unshift(newBook);
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    return book;
}

function updateBook(bookId, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return (
            book.id === bookId
        )
    })
    gBooks[bookIdx].price = price + '$';
}

function changeRate(btn, bookId) {
    if (btn.dataset.val === 'rate-up') {
        var book = getBookById(bookId);
        book.rating += 1
    } else {
        var book = getBookById(bookId);
        book.rating -= 1
    }
    
}