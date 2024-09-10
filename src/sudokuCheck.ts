import { solvedBoard, getGameRunning } from "./sudokuGenerator.js";

let wrongMoves = 0;
export function resetWrongMoves() {
    wrongMoves = 0;
    updateWrongMovesDisplay();
}

function updateWrongMovesDisplay() {
    const wrongMovesCounter = document.getElementById('wrongMovesCounter');
    if (wrongMovesCounter) {
        if (getGameRunning() === false) {
            wrongMovesCounter.textContent = '';
        } else {
            wrongMovesCounter.textContent = `Wrong moves: ${wrongMoves}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.sudokuGrid input[type="text"]');

    cells.forEach((cell, index) => {
        cell.addEventListener('input', (event) => {
            if (getGameRunning() === false) {
                return;
            }

            const inputElement = event.target as HTMLInputElement;
            const row = Math.floor(index / 9);
            const col = index % 9;
            const userInput = parseInt(inputElement.value);

            if (isNaN(userInput) || inputElement.value === '' || userInput === 0) {
                inputElement.style.backgroundColor = '';
                return;
            }

            if (userInput !== solvedBoard[row][col]) {
                inputElement.style.backgroundColor = 'red';
                wrongMoves++;
            }
            updateWrongMovesDisplay();
        });
    });

});