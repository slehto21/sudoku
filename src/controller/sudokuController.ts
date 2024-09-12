import { resetSudoku, generateSudoku, solveSudoku } from '../model/sudokuModel.js';
import { fillClientBoard, resetStyles } from '../view/sudokuView.js';
import { updateHintsDisplay, updateTimerDisplay, updateWrongMovesDisplay } from '../view/gameView.js';
import { getWrongMoves, getHintsUsed, getGameRunning } from '../model/gameModel.js';


export function handleSolveSudoku() {
    if (getGameRunning()) {
        const confirmSolveModal = document.getElementById('confirmSolveModal');
        const confirmSolveButton = document.getElementById('confirmSolveButton');
        const cancelSolveButton = document.getElementById('cancelSolveButton');
        if (confirmSolveModal && confirmSolveButton && cancelSolveButton) {
            confirmSolveModal.style.display = 'block';
            confirmSolveButton.addEventListener('click', () => {
                const board = solveSudoku();
                if (board !== null) {
                    updateTimerDisplay(0, 0, 0, getGameRunning());
                    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
                    updateHintsDisplay(getHintsUsed(), getGameRunning());
                    fillClientBoard(board, true);
                }
                else {
                    alert('Invalid starting board!')
                }
                confirmSolveModal.style.display = 'none';
            });
            cancelSolveButton.addEventListener('click', () => {
                confirmSolveModal.style.display = 'none';
            });
            window.onclick = (event) => {
                if (event.target === confirmSolveModal) {
                    confirmSolveModal.style.display = 'none';
                }
            }
        }
        return;
    }
    const board = solveSudoku();
    if (board !== null) {
        fillClientBoard(board, true);
    }
    else {
        alert('Invalid starting board!')
    }
}

export function handleResetSudoku() {
    const board = resetSudoku();
    resetStyles();
    updateTimerDisplay(0, 0, 0, getGameRunning());
    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
    updateHintsDisplay(getHintsUsed(), getGameRunning());
    fillClientBoard(board, false);
}

export function handleGenerateSudoku(difficulty: string) {
    const board = generateSudoku(difficulty);
    resetStyles();
    fillClientBoard(board, false);
    updateWrongMovesDisplay(getWrongMoves(), getGameRunning());
    updateHintsDisplay(getHintsUsed(), getGameRunning());
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('difficultyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}