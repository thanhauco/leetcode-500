# LeetCode 1337 — The K Weakest Rows in a Matrix (Easy)
# Category: Heap / Priority Queue · Approach: Sort by strength
# Time: O(m·n + m log m) | Space: O(m)
# Source: https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/

def k_weakest_rows(mat: list[list[int]], k: int) -> list[int]:
    rows = sorted(range(len(mat)), key=lambda i: (sum(mat[i]), i))
    return rows[:k]
