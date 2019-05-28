'use strict'

var gBoard;
var gNextNum = 1;
var gNums;
var gShuffledNums;
var gStartTime;
var gStartInterval;

function init() {
    console.log('Ready to begin');

}

function gameLevel(level) {
    gNums = createNumsArray(level);
    gShuffledNums = shuffleArray(gNums);
    gBoard = createBoard(level, gShuffledNums);
}

function createBoard(tableSize, gShuffledNums) {
    var length = Math.sqrt(tableSize);
    var shuffledNumsCopy = gShuffledNums.slice();
    var strHTML = ''
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            strHTML += '<td onclick="cellClicked(this)">';
            strHTML += shuffledNumsCopy.pop();
            strHTML += '</td>';
        }
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elNum) {
    if (gNextNum === 1) {
        gStartTime = new Date();
        openGameCounter();
    }
    if (gShuffledNums.length === 16 && +elNum.innerText === 16) {
        closeGameCounter();
    }
    if (gShuffledNums.length === 36 && +elNum.innerText === 36) {
        closeGameCounter();
    }
    if (+elNum.innerText === gNextNum) {
        gNextNum++
        elNum.innerText = '❌';
    } 
}


function openGameCounter() {
    var elTimeCounter = document.querySelector('.gameCounter');
    elTimeCounter.style.display = 'block';
    gStartInterval = setInterval(stopWatch, 100);

}

function closeGameCounter() {
    clearInterval(gStartInterval);
}


function stopWatch() {
    var currTime = new Date();
    var stopWatch = ((currTime - gStartTime) / 1000);
    var elTimeCounter = document.querySelector('.gameCounter');
    var elH3 = elTimeCounter.querySelector('h3');
    elH3.innerText = 'Stopwatch: ' + stopWatch;
}

function createNumsArray(boardLength) {
    var nums = [];
    for (var i = 0; i < boardLength; i++) {
        nums[i] = i + 1;
    }
    return nums;
}

function shuffleArray(nums) {
    var j;
    var i;
    var tempNum;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempNum = nums[i];
        nums[i] = nums[j];
        nums[j] = tempNum;
    }
    return nums;
}
