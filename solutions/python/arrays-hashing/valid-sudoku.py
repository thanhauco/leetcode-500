# LeetCode 36 — Valid Sudoku (Medium)
# Category: Arrays & Hashing · Approach: Hash Sets
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/valid-sudoku/

def is_valid_sudoku(board: list[list[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v == ".":
                continue
            b = (r // 3) * 3 + c // 3
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                return False
            rows[r].add(v)
            cols[c].add(v)
            boxes[b].add(v)
    return True
