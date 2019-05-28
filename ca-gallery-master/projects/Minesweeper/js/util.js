
function createCell(i, j) {
	var cell = {
		location: {
			i: i,
			j: j
		},
		gameElement: null,
		currCellContent: null,
		isShown: false
	};
	return cell;
}

function createBoard(level) {
	var board = [];
	// Create the Matrix according to game level
	for (var i = 0; i < level; i++) {
		board[i] = [];
		for (var j = 0; j < level; j++) {
			board[i][j] = createCell(i, j)
		}
	}
	return board;
}

function renderMat(mat, selector) {

	var strHTML = '<table class="mat" border="2"><tbody>';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			var cellClass = getClassName({ i: i, j: j });
			strHTML += `<td class="cell ${cellClass} floor" oncontextmenu="event.preventDefault()" onmousedown="cellClicked(event,this,${i},${j})"></td>`
		}
		strHTML += '</tr>'
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}


//placing each cell with the right number of mine neighbors he has in 1 cell radius
function checkMineNegs(board) {
	var minesCount = 0;
	var rows;
	var cols;
	for (rows = 0; rows < board.length; rows++) {
		for (cols = 0; cols < board[0].length; cols++) {
			for (var i = rows - 1; i <= rows + 1; i++) {
				for (var j = cols - 1; j <= cols + 1; j++) {
					if (i < 0 || j < 0 || i >= board.length || j >= board.length) continue;
					if (board[i][j] === board[rows][cols]) continue;
					if (board[rows][cols].currCellContent === MINE) continue;
					if (board[i][j].currCellContent === MINE) {
						minesCount++;

					}
				}
			}
			if (minesCount !== 0) {
				board[rows][cols].currCellContent = minesCount;
				minesCount = 0;
			}
		}
	}
}


// rendering the board with mines according to the game level
function placeMines(num) {
	gFlagCount = num;
	gMinesCount = num;
	for (var i = 0; i < gMinesCount; i++) {
		var posI = getRandomInt(0, gBoard.length);
		var posJ = getRandomInt(0, gBoard.length);
		gBoard[posI][posJ].currCellContent = MINE
		gMinesPos.push(gBoard[posI][posJ]);
	}
	console.log('The location of the mines is:', gMinesPos);

}


function revealAll() {
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			var tempCell = '.' + getClassName(gBoard[i][j].location);
			var nakedCell = document.querySelector(tempCell);
			nakedCell.classList.remove('floor');
			if (gBoard[i][j].currCellContent !== MINE) {
				renderCell(gBoard[i][j].location, gBoard[i][j].currCellContent)
			}
		}
	}
}

function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}



function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function stopWatch() {
	var currTime = new Date();
	var stopWatch = Math.floor((((currTime - gStartTime) / 1000)));
	var elTimeCounterH4 = document.querySelector('.header h4');
	elTimeCounterH4.innerText = 'Time: ' + stopWatch + ' Seconds';
}


