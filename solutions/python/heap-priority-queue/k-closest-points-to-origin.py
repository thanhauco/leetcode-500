# LeetCode 973 — K Closest Points to Origin (Medium)
# Category: Heap / Priority Queue · Approach: Sort by squared distance
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/k-closest-points-to-origin/

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    return sorted(points, key=lambda p: p[0] * p[0] + p[1] * p[1])[:k]
