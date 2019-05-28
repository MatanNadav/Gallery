'use strict';

var gProjs;

console.log(gProjs);

function createProjs() {
    var projs = [

        createProj('Minesweeper','Game',
            'The familiar game with a different flair.',
             'img/myPic/Minesweeper - thumbnail.png','img/myPic/Minesweeper.png', 'projects/Minesweeper/index.html',['Recursion']),

        createProj('Safe Storage','Web security and storage',
            'A page that gives a safe place to hide and access sensitive material',
            'img/myPic/Safe storage - thumbnail.png','img/myPic/Safe storage.png','projects/Safe storage/index.html' ,['Inputs', 'Selectors']),

        createProj('Pacman', 'Game',
            'Trying to give the familiar game some extra buzz in order to provide access for younger audience.',
            'img/myPic/Pacman - thumbnail.png','img/myPic/Pacman.png', 'N/A',['Loops', 'Globals']),

        createProj('Guess me', 'Game',
            'Extrapolating from the original Akinator game. this game is fresh and still needs to be played in order to achieve "magic" status.',
            'img/myPic/Guess me - thumbnail.png','img/myPic/Guess me.png', 'projects/Guess me/index.html',['Jquerry']),

        createProj('Touch-nums', 'Game',
            'A fun game testing skill and speed on mind',
            'img/myPic/Touch-nums - thumbnail.png','img/myPic/Touch-nums.png','projects/Touch-Nums/index.html',['Arrays', 'Loops']),

        createProj('Book store', 'Digital library',
            'Interactive table providing the available books in store, able to add, delete and review',
            'img/myPic/Book store - thumbnail.png','img/myPic/Book store.png', 'projects/Book shop/index.html',['Jquery', 'bootstrap']),

    ]
    gProjs = projs;
    return projs;
}

function createProj(txt, title, desc, thumbnail, img, url ,label) {
    var proj = {
        id: makeId(),
        name: txt,
        title: title,
        desc: desc,
        imgThumb: thumbnail,
        img: img,
        publishedAt: new Date(),
        gameUrl: url,
        labels: label.join()
    }
    return proj;
}


function getProjById(projId) {
    var projId = gProjs.find(function (proj) {
        return proj.id === projId
    })
    return projId;
}



function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var ids = [];
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if(ids.includes(txt)) makeId();
    else{
        ids.push(txt);
        return txt;
    }
}