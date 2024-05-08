const sudokuBoard: number[][] = [ 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] 
];

function solveSudoku(){
    fillGrid();
    if(isValidStartingBoard(sudokuBoard)){
        solveSudokuBoard(sudokuBoard);
        fillClientGrid();
    }
    else{
        alert('Invalid starting board!')
    }   
}

function resetSudoku(){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            sudokuBoard[row][col] = 0;
        }
    }
    fillClientGrid();
}

function fillGrid(){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId) as HTMLInputElement;
            const value = input.value;
            if(value !== ""){
                sudokuBoard[row][col] = parseInt(value);
            }
            else{
                sudokuBoard[row][col] = 0;
            }
        }
    }
}

function isValidStartingBoard(board : number[][]){
    for(let row = 0; row < 9; row++){
        const rowSet = new Set<number>();
        const colSet = new Set<number>();
        const boxSet = new Set<number>();
        for(let col = 0; col < 9; col++){
            if(board[row][col] !== 0){
                if(rowSet.has(board[row][col])){
                    return false;
                }
                rowSet.add(board[row][col]);
            }

            if(board[col][row] !== 0){
                if(colSet.has(board[col][row])){
                    return false;
                }
                colSet.add(board[col][row]);
            }

            const rowOffset = 3 * Math.floor(row / 3);
            const colOffset = 3 * (row % 3);
            const boxRow = rowOffset + Math.floor(col / 3);
            const boxCol = colOffset + (col % 3);

            if (board[boxRow][boxCol] !== 0) {
                if (boxSet.has(board[boxRow][boxCol])){
                    return false;
                } 
                boxSet.add(board[boxRow][boxCol]);
            }
        }
    }
    return true;
}

function isNumberInRow(board : number[][], row : number, num : number){
    for(let i = 0; i < 9; i++){
        if(board[row][i] === num){
            return true;
        }
    }
    return false;
}

function isNumberInCol(board : number[][], col : number, num : number){
    for(let i = 0; i < 9; i++){
        if(board[i][col] === num){
            return true;
        }
    }
    return false;
}

function isNumberInBox(board : number[][], row : number, col : number, num : number){
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[startRow + i][startCol + j] === num){
                return true;
            }
        } 
    }
    return false;
}

function isValidMove(board : number[][], row : number, col : number, num : number){
    return !isNumberInRow(board, row, num) && !isNumberInCol(board, col, num) && !isNumberInBox(board, row, col, num);
}

function solveSudokuBoard(board : number[][]){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(board[row][col] === 0){
                for(let i = 1; i < 10; i++){
                   if(isValidMove(board, row, col, i)){
                    board[row][col] = i;
                    if(solveSudokuBoard(board)){
                        return true;
                    }
                    else{
                        board[row][col] = 0;
                    }
                   }
                }
                return false;
            }
        }
    }
    return true;
}

function fillClientGrid(){
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const inputId = `cell${row}${col}`;
            const input = document.getElementById(inputId) as HTMLInputElement;

            if (input) {
                input.value = sudokuBoard[row][col] !== 0 ? sudokuBoard[row][col].toString() : '';
            }
        }
    }
}

function printSudoku(board : number[][]){
    for(let row = 0; row < board.length; row++){
        let line = "";
        for(let col = 0; col < board[row].length; col++){
            line += (col % 3 === 0 ? ' | ' : ' ') + board[row][col];
        }
        line += ' |';
        console.log(line);
        if ((row + 1) % 3 === 0) {
            console.log('-------------------------');
        }
    }
}