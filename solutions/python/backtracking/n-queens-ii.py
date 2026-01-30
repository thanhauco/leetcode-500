# LeetCode 52 — N-Queens II (Hard)
# Category: Backtracking · Approach: Backtracking
# Time: O(n!) | Space: O(n)
# Source: https://leetcode.com/problems/n-queens-ii/

def total_n_queens(n: int) -> int:
    cols: set[int] = set()
    diag1: set[int] = set()
    diag2: set[int] = set()
    count = 0

    def bt(row: int) -> None:
        nonlocal count
        if row == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (row - c) in diag1 or (row + c) in diag2:
                continue
            cols.add(c)
            diag1.add(row - c)
            diag2.add(row + c)
            bt(row + 1)
            cols.remove(c)
            diag1.remove(row - c)
            diag2.remove(row + c)

    bt(0)
    return count
