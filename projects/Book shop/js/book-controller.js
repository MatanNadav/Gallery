'use strict';

$(document).ready(function () {
    console.log('ready for action');
    createBooks();
    renderBooks(gBooks, '.book-list');
})



function renderBooks(books, selector) {
    var strHtmls = '';
    books.forEach(function (book) {
        strHtmls += `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
    <td><img src="${book.imgUrl}"width="70px" height="70px"></td>
    <td> 
    <button data-book="${book.id}" type="button" class="btn btn-primary read">Read</button>
    <button data-book="${book.id}" type="button" class="btn btn-secondary update">Update</button>
    <button data-book="${book.id}" type="button" class="btn btn-warning delete">Delete</button>
    </td>
    </tr>`
    })

    $(selector).html(strHtmls);
    addEventListener();
}



function addEventListener() {

    $('.btn-link').click(function readAndAddNewBook() {
        console.log('adding');
        var book = prompt('Enter the name and price seperated with , ');
        var sep = book.indexOf(',');
        var bookName = book.substring(0, sep);
        var bookPrice = book.substring(sep + 1, book.length);
        addBook(bookName, bookPrice);
        renderBooks(gBooks, '.book-list');
    })

    $('.read').click(function onReadBook() {
        var book = getBookById(this.dataset.book)
        var bookId = book.id
        // console.log('read');
        $('.modal-body > pre').html(
            `
            Name: ${book.name} 
            Author: ${book.author}
            Rating: <button onclick="onChangeRate(this, '${bookId}')" data-val="rate-down">-</button><span class="rate"> ${book.rating}</span> <button onclick="onChangeRate(this,'${bookId}')" data-val="rate-up">+</button>                                
            Picture: <img src="${book.imgUrl}"width="70px" height="70px">
            `
        )
        $('.modal').show();
    })

    $('.close, .btn-secondary').click(function () {
        $('.modal').hide();
    })

    $('.update').click(function readAndUpdateBook() {
        // console.log('update');
        var newBookPrice = prompt('Enter the new price ');
        if (!newBookPrice || newBookPrice < 1) return
        updateBook(this.dataset.book, newBookPrice);
        renderBooks(gBooks, '.book-list');
    })


    $('.delete').click(function onDeleteBook(ev) {
        // console.log('delete');
        deleteBook(this.dataset.book);
        renderBooks(gBooks, '.book-list');
    })

}

function onChangeRate(btn, bookId) {
    changeRate(btn, bookId);
    var book = getBookById(bookId);
    $('.rate').text(' '+book.rating)
}
