
var FLOOR = 'floor';
var MINE = 'mine';
var FLAG = 'flag';
var EMPTY = '';

var MINE_IMG = '💥';
var FLAG_IMG = '🚩';
var NORMAL = '&#x1F642';
var SAD = '&#x1F622';
var WIN = '&#x1F60E';

var gIsFirstClick;
var gBoard;
var gGameLevel;
var gMinesPos;
var gEmptyNeigs;
var gMinesCount;
var gIsWin;
var gIsLoose;
var gLives;
var gIsLivesHelp;
var gStartTime;
var gTimeInterval;

function init() {
    gIsFirstClick = true
    gStartTime = new Date();
    gIsLivesHelp = false;
    gLives = 3;
    gMinesPos = [];
    gEmptyNeigs = [];
    gIsWin = false;
    gIsLoose = false;
    var elFaceH3 = document.querySelector('.header h3')
    elFaceH3.innerHTML = NORMAL;
    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'none';
    gameLevel(gGameLevel);
}

function gameLevel(level) {
    gGameLevel = level;
    gBoard = createBoard(level);
    renderMat(gBoard, '.board-container');

    if (gIsFirstClick === true) {
        if (gGameLevel === 4) placeMines(2)
        else if (gGameLevel === 8) placeMines(12)
        else if (gGameLevel === 12) placeMines(30)
        checkMineNegs(gBoard);
    }
}



function cellClicked(ev, cell, i, j) {
    if (gIsWin === true) return;
    if (gIsLoose === true) return;
    if (gIsFirstClick === true) {
        gTimeInterval = setInterval(stopWatch, 100);
    }
    //when: user is pressing a number/empty cell
    if (ev.button === 0 && gBoard[i][j].gameElement === null && gBoard[i][j].currCellContent !== MINE) {
        var freeCellClass = '.' + getClassName(gBoard[i][j].location);
        var freeCell = document.querySelector(freeCellClass);
        freeCell.classList.remove('floor');
        gBoard[i][j].isShown = true;
        if (gBoard[i][j].currCellContent === null) {
            checkNeighbors(i, j);
        }
        if (gIsFirstClick) gIsFirstClick = false;
        renderCell(gBoard[i][j].location, gBoard[i][j].currCellContent);
    }

    //when: user is activating a mine with no lives left/activated
    if (ev.button === 0 && gBoard[i][j].currCellContent === MINE && gIsFirstClick === false &&
        gBoard[i][j].gameElement !== FLAG && (gLives === 0 || !gIsLivesHelp)) {
        for (var idx = 0; idx < gMinesPos.length; idx++) {
            var freeCellClass = '.' + getClassName(gMinesPos[idx].location);
            var freeCell = document.querySelector(freeCellClass);
            freeCell.classList.add('mine');
            renderCell(gMinesPos[idx].location, MINE_IMG)
            gameOver();
            revealAll();
        }
    }

    //when: user is pressing a mine with lives left/activated
    if (ev.button === 0 && gBoard[i][j].currCellContent === MINE && gIsLivesHelp && gLives !== 0) {
        gLives--;
        var elModal = document.querySelector('.modal');
        var elModalH3 = document.querySelector('.modal h3');
        elModalH3.innerText = `You have ${gLives} lives left`;
        elModal.style.display = 'block';
    }

    if (ev.button === 2) {
        gIsFirstClick = false;
        // placing / removing a flag
        cellMarked(null, cell, i, j);
    }
}

// placing / removing a flag and checking for possible win
function cellMarked(ev, cell, i, j) {

    if (gIsWin) return;
    if (!cell.classList.contains('floor')) return;
    else if (gBoard[i][j].isShown === true) {
        gBoard[i][j].isShown = false;
        gBoard[i][j].gameElement = null;
        gFlagCount++;
        renderCell(gBoard[i][j].location, EMPTY);
    } else {
        gBoard[i][j].isShown = true;
        gBoard[i][j].gameElement = FLAG;
        renderCell(gBoard[i][j].location, FLAG_IMG);
        gFlagCount--;
        if (gFlagCount === 0) {
            gIsWin = isWin();
        }
    }
}

//checking neighbors in 1 cell radius and revealing them if conditions are met
function checkNeighbors(x, y) {
    
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (i < 0 || j < 0 || i >= gBoard.length || j >= gBoard.length) continue;
            if (gBoard[i][j] === gBoard[x][y]) continue;
            if (gBoard[i][j].gameElement === null && gBoard[i][j].currCellContent === null && gBoard[i][j].isShown === false) {
                gEmptyNeigs.push(gBoard[i][j]);
            }
            if (gBoard[i][j].gameElement === null && gBoard[i][j].currCellContent !== MINE) {
                var freeCellName = '.' + getClassName(gBoard[i][j].location);
                var freeCell = document.querySelector(freeCellName);
                freeCell.classList.remove('floor');
                if (gBoard[i][j].currCellContent !== null && gBoard[i][j].isShown === false) {
                    gBoard[i][j].isShown = true;
                    renderCell(gBoard[i][j].location, gBoard[i][j].currCellContent);
                }
            } else break;
        }
    }
    if (gEmptyNeigs.length > 0) {
        var emptyNeig = gEmptyNeigs.pop();
        gBoard[emptyNeig.location.i][emptyNeig.location.j].isShown = true;
        checkNeighbors(emptyNeig.location.i, emptyNeig.location.j);
    }
}

//Activating 3 lives
function activateLives(ev) {
    if (gIsWin === true) return;
    if (gIsLoose === true) return;
    if (ev.button === 0) {
        gIsLivesHelp = true;
        var elLivesBtnTxt = document.querySelector('.lives-button h3');
        elLivesBtnTxt.style.color = 'green';
    } else if (ev.button === 2) {
        gIsLivesHelp = false;
        var elLivesBtnTxt = document.querySelector('.lives-button h3');
        elLivesBtnTxt.style.color = 'black';
    }

}

function isWin() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].currCellContent === MINE && gBoard[i][j].gameElement === FLAG) {
                count++;
                if (count === gMinesCount) {
                    clearInterval(gTimeInterval);
                    var elFaceH3 = document.querySelector('.header h3')
                    elFaceH3.innerHTML = WIN;
                    var elGameOver = document.querySelector('.game-over');
                    var elGameOverH3 = document.querySelector('.game-over h3');
                    elGameOverH3.innerText = 'You have Won...';
                    elGameOver.style.display = 'block';
                    return true;
                }
            }
        }
    }
    return false;
}

function gameOver() {
    gIsLoose = true;
    clearInterval(gTimeInterval);
    var elGameOver = document.querySelector('.game-over');
    var elGameOverH3 = document.querySelector('.game-over h3');
    elGameOverH3.innerText = 'You have lost...';
    elGameOver.style.display = 'block';
    var elFaceH3 = document.querySelector('.header h3')
    elFaceH3.innerHTML = SAD;
}
