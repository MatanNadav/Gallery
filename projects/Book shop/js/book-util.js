'use strict';

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function getBookAuthor() {
    var bookAuthors = ['C.ronaldo', 'R.Carlos', 'L.Messi', 'L.Modrich', 'Y.Benayoun', 'Hazard Brothers'];
    var randBookAuthorsIdx = getRandomInt(0, bookAuthors.length);
    return bookAuthors[randBookAuthorsIdx];
}




function getBookUrl() {
    var booksUrl = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9NDQ3ShkpwJYTb25bwLsWDlgDxPyXWmPvu0c8U3EcI_rLUBB',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSubiDdcuxcE5K21HHJ7xxGIv8A8Q4W_pegewBJKYHTZeSyVx4v',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZUTNSlTyzfXPR7So8-rvyz4YwLjvX9vkXNW_4voomF1wxPnchw',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxgfYYzf6T4KGWprg5e4ijUtRvh4DWNPG33QrojXe-2sE7pYgL',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtSXZydGP8nisMGnMN6cCV2O8jzbWVBAvCmmjJozayCOe1q0H',
    ];
    var randBooksUrlIdx = getRandomInt(0, booksUrl.length);
    return booksUrl[randBooksUrlIdx];
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}


function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}