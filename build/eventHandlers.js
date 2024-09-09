import { solveSudoku, resetSudoku } from './sudokuSolver.js';
import { generateSudoku } from './sudokuGenerator.js';
import { getHint } from './sudokuHint.js';
document.addEventListener('DOMContentLoaded', () => {
    const solveButton = document.getElementById('solveButton');
    const hintButton = document.getElementById('hintButton');
    const resetButton = document.getElementById('resetButton');
    const easyButton = document.getElementById('easyButton');
    const mediumButton = document.getElementById('mediumButton');
    const hardButton = document.getElementById('hardButton');
    if (solveButton)
        solveButton.addEventListener('click', solveSudoku);
    if (hintButton)
        hintButton.addEventListener('click', getHint);
    if (resetButton)
        resetButton.addEventListener('click', resetSudoku);
    if (easyButton)
        easyButton.addEventListener('click', () => generateSudoku("Easy"));
    if (mediumButton)
        mediumButton.addEventListener('click', () => generateSudoku("Medium"));
    if (hardButton)
        hardButton.addEventListener('click', () => generateSudoku("Hard"));
});
