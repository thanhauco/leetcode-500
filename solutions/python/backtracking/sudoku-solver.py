# LeetCode 37 — Sudoku Solver (Hard)
# Category: Backtracking · Approach: Backtracking
# Time: O(9^m) | Space: O(m)
# Source: https://leetcode.com/problems/sudoku-solver/

def solve_sudoku(board: list[list[str]]) -> list[list[str]]:
    g = [row[:] for row in board]

    def valid(r: int, c: int, ch: str) -> bool:
        for i in range(9):
            if g[r][i] == ch or g[i][c] == ch:
                return False
            if g[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:
                return False
        return True

    def solve() -> bool:
        for r in range(9):
            for c in range(9):
                if g[r][c] == '.':
                    for ch in '123456789':
                        if valid(r, c, ch):
                            g[r][c] = ch
                            if solve():
                                return True
                            g[r][c] = '.'
                    return False
        return True

    solve()
    return g
