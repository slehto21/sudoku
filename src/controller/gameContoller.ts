import { getGameRunning, getBoardState, getEmptyCell, incrementHintsUsed, incrementWrongMoves, getWrongMoves, getHintsUsed } from "../model/gameModel.js";
import { updateHintsDisplay, placeHintOnBoard, updateWrongMovesDisplay, setCellBackground, updateTimerDisplay } from "../view/gameView.js";
import { getSolvedBoard } from "../model/sudokuModel.js";

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.sudokuGrid input[type="text"]');

    cells.forEach((cell, index) => {
        cell.addEventListener('input', (event) => {
            handleInput(event, index);
        });
    });
});

function handleInput(event: Event, index: number) {
    if (!getGameRunning()) {
        return;
    }
    
    const solvedBoard = getSolvedBoard();
    const inputElement = event.target as HTMLInputElement;
    const row = Math.floor(index / 9);
    const col = index % 9;
    const userInput = parseInt(inputElement.value);

    if (isNaN(userInput) || inputElement.value === '' || userInput === 0) {
        setCellBackground(inputElement, '');  
        return;
    }

    if (userInput !== solvedBoard[row][col]) {
        setCellBackground(inputElement, 'red'); 
        incrementWrongMoves();
    }
    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
}

export function getHint() {
    if (!getGameRunning()) {
        return;
    }

    const board = getBoardState();
    let emptyCell = getEmptyCell(board);
    if (emptyCell === undefined) {
        return;
    }
    incrementHintsUsed();
    updateHintsDisplay(getHintsUsed(), getGameRunning());
    placeHintOnBoard(emptyCell, getSolvedBoard());
}

export function handleTimerDisplay(hours: number, minutes: number, seconds: number) {
    updateTimerDisplay(hours, minutes, seconds, getGameRunning());
}