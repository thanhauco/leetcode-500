# LeetCode 77 — Combinations (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(k · C(n,k)) | Space: O(k)
# Source: https://leetcode.com/problems/combinations/

def combine(n: int, k: int) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def bt(start: int) -> None:
        if len(path) == k:
            res.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            bt(i + 1)
            path.pop()

    bt(1)
    return res
