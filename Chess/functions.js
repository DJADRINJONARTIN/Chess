function makeBoard(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++)
		arr[i] = new Array(rows);
	return arr;
}

function flipBoard() {
	for (let i = 0;i < cols;i++) {
		for (let j = 0;j < rows;j++) {
			// const formula = (rows - 1) - j;
			// let obj = board[i][j];
			// const objT = obj.type,
			// 			objS = obj.state;
			// const formulaT = board[i][formula].type,
			// 			formulaS = board[i][formula].state;
			// // board[i][formula].type = objT;
			// board[i][j].type = formulaT;
		}
	}
}