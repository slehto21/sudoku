import { handleGenerateSudoku, handleResetSudoku, handleSolveSudoku } from './sudokuController.js';
import { getHint } from './gameContoller.js';
import { chooseDifficultyModal } from '../view/gameView.js';
document.addEventListener('DOMContentLoaded', () => {
    const solveButton = document.getElementById('solveButton');
    const hintButton = document.getElementById('hintButton');
    const resetButton = document.getElementById('resetButton');
    const easyButton = document.getElementById('easyButton');
    const mediumButton = document.getElementById('mediumButton');
    const hardButton = document.getElementById('hardButton');
    const newGameButton = document.getElementById('newGameButton');
    const modalEasyButton = document.getElementById('modalEasyButton');
    const modalMediumButton = document.getElementById('modalMediumButton');
    const modalHardButton = document.getElementById('modalHardButton');
    if (solveButton)
        solveButton.addEventListener('click', handleSolveSudoku);
    if (hintButton)
        hintButton.addEventListener('click', getHint);
    if (resetButton)
        resetButton.addEventListener('click', handleResetSudoku);
    if (easyButton)
        easyButton.addEventListener('click', () => handleGenerateSudoku("Easy"));
    if (mediumButton)
        mediumButton.addEventListener('click', () => handleGenerateSudoku("Medium"));
    if (hardButton)
        hardButton.addEventListener('click', () => handleGenerateSudoku("Hard"));
    if (newGameButton)
        newGameButton.addEventListener('click', chooseDifficultyModal);
    if (modalEasyButton)
        modalEasyButton.addEventListener('click', () => handleGenerateSudoku("Easy"));
    if (modalMediumButton)
        modalMediumButton.addEventListener('click', () => handleGenerateSudoku("Medium"));
    if (modalHardButton)
        modalHardButton.addEventListener('click', () => handleGenerateSudoku("Hard"));
});
