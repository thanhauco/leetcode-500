# LeetCode 240 — Search a 2D Matrix II (Medium)
# Category: Binary Search · Approach: Staircase
# Time: O(m + n) | Space: O(1)
# Source: https://leetcode.com/problems/search-a-2d-matrix-ii/

def search_matrix(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:
        return False
    r, c = 0, len(matrix[0]) - 1
    while r < len(matrix) and c >= 0:
        v = matrix[r][c]
        if v == target:
            return True
        if v > target:
            c -= 1
        else:
            r += 1
    return False
