from robot.api import logger

class SudokuSolverLibrary:
    def solve_sudoku_board(self, board):
        """
        Solves a Sudoku board.
        :param board: 2D list representing the Sudoku board (0 represents empty cells).
        :return: Solved Sudoku board as a 2D list.
        """
        logger.info(f"Solving Sudoku:\n{board}")
        if self._solve(board):
            logger.info(f"Solved Sudoku:\n{board}")
            return board
        else:
            raise ValueError("The Sudoku puzzle is unsolvable.")

    def _solve(self, board):
        """Recursive backtracking solver for Sudoku."""
        empty_cell = self._find_empty_cell(board)
        if not empty_cell:
            logger.info("No empty cells")
            logger.info(board)
            return True  # No empty cells, puzzle solved

        row, col = empty_cell
        for num in range(1, 10):
            if self._is_valid(board, num, row, col):
                board[row][col] = num

                if self._solve(board):
                    return True

                board[row][col] = 0  # Backtrack

        return False

    def _find_empty_cell(self, board):
        """Finds the first empty cell (0) on the board."""
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    logger.info(f"Empty cell found at ({row}, {col})")
                    logger.info(board[row][col])
                    return row, col
        return None

    def _is_valid(self, board, num, row, col):
        """Checks if placing num at board[row][col] is valid."""
        # Check row
        if num in board[row]:
            return False

        # Check column
        if num in [board[r][col] for r in range(9)]:
            return False

        # Check 3x3 box
        box_start_row = (row // 3) * 3
        box_start_col = (col // 3) * 3
        for r in range(box_start_row, box_start_row + 3):
            for c in range(box_start_col, box_start_col + 3):
                if board[r][c] == num:
                    return False

        return True