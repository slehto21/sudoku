import { getGameRunning, getBoardState, getEmptyCell, incrementHintsUsed, incrementWrongMoves, getWrongMoves, getHintsUsed, getGameTime } from "../model/gameModel.js";
import { updateHintsDisplay, placeHintOnBoard, updateWrongMovesDisplay, setCellBackground, updateTimerDisplay, completionModal } from "../view/gameView.js";
import { compareBoards, endGame, getSolvedBoard } from "../model/sudokuModel.js";
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.sudokuGrid input[type="text"]');
    cells.forEach((cell, index) => {
        cell.addEventListener('input', (event) => {
            handleInput(event, index);
        });
    });
});
function handleInput(event, index) {
    if (!getGameRunning()) {
        return;
    }
    const solvedBoard = getSolvedBoard();
    const inputElement = event.target;
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
        updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
        return;
    }
    const board = getBoardState();
    if (compareBoards(board, solvedBoard)) {
        endGame();
        completionModal(getGameTime(), getWrongMoves(), getHintsUsed(), getGameRunning());
    }
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
    if (compareBoards(getBoardState(), getSolvedBoard())) {
        endGame();
        completionModal(getGameTime(), getWrongMoves(), getHintsUsed(), getGameRunning());
    }
}
export function handleTimerDisplay(hours, minutes, seconds) {
    updateTimerDisplay(hours, minutes, seconds, getGameRunning());
}
