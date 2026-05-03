# LeetCode 1351 — Count Negative Numbers in a Sorted Matrix (Easy)
# Category: Binary Search · Approach: Count
# Time: O(m * n) | Space: O(1)
# Source: https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/

def count_negatives(grid: list[list[int]]) -> int:
    return sum(1 for row in grid for v in row if v < 0)
