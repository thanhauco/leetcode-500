# LeetCode 118 — Pascal's Triangle (Easy)
# Category: 2-D Dynamic Programming · Approach: Row by Row
# Time: O(numRows^2) | Space: O(numRows^2)
# Source: https://leetcode.com/problems/pascals-triangle/

def generate(num_rows: int) -> list[list[int]]:
    rows: list[list[int]] = []
    for r in range(num_rows):
        row = [1] * (r + 1)
        for c in range(1, r):
            row[c] = rows[r - 1][c - 1] + rows[r - 1][c]
        rows.append(row)
    return rows
