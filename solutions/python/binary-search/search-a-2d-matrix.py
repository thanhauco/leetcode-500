# LeetCode 74 — Search a 2D Matrix (Medium)
# Category: Binary Search · Approach: Flattened Binary Search
# Time: O(log(m·n)) | Space: O(1)
# Source: https://leetcode.com/problems/search-a-2d-matrix/

def search_matrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    lo, hi = 0, m * n - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False
