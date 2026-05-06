# LeetCode 119 — Pascal's Triangle II (Easy)
# Category: 1-D Dynamic Programming · Approach: Rolling Row
# Time: O(rowIndex^2) | Space: O(rowIndex)
# Source: https://leetcode.com/problems/pascals-triangle-ii/

def get_row(row_index: int) -> list[int]:
    row = [1]
    for _ in range(row_index):
        row = [a + b for a, b in zip([0] + row, row + [0])]
    return row
