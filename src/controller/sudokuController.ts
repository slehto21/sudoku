import { resetSudoku, generateSudoku, solveSudoku } from '../model/sudokuModel.js';
import { fillClientBoard, resetStyles } from '../view/sudokuView.js';
import { updateHintsDisplay, updateTimerDisplay, updateWrongMovesDisplay } from '../view/gameView.js';
import { getWrongMoves, getHintsUsed, getGameRunning, getElapsedTime } from '../model/gameModel.js';


export function handleSolveSudoku() {
    const board = solveSudoku();
    if (board !== null) {
        fillClientBoard(board);
    }
    else {
        alert('Invalid starting board!')
    }
}

export function handleResetSudoku() {
    const board =  resetSudoku();
    resetStyles();               
    updateTimerDisplay(0, 0, 0, getGameRunning());
    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
    updateHintsDisplay(getHintsUsed(), getGameRunning());
    fillClientBoard(board);
}

export function handleGenerateSudoku(difficulty: string) {
    const board = generateSudoku(difficulty);
    resetStyles();                               
    fillClientBoard(board); 
    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
    updateHintsDisplay(getHintsUsed(), getGameRunning());
}