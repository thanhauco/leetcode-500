# LeetCode 378 — Kth Smallest Element in a Sorted Matrix (Medium)
# Category: Heap / Priority Queue · Approach: Flatten + sort
# Time: O(n² log n) | Space: O(n²)
# Source: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/

def kth_smallest(matrix: list[list[int]], k: int) -> int:
    flat = [v for row in matrix for v in row]
    flat.sort()
    return flat[k - 1]
