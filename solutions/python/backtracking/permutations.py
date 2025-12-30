# LeetCode 46 — Permutations (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(n·n!) | Space: O(n)
# Source: https://leetcode.com/problems/permutations/

def permute(nums: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    used = [False] * len(nums)
    path: list[int] = []

    def dfs() -> None:
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i, x in enumerate(nums):
            if used[i]:
                continue
            used[i] = True
            path.append(x)
            dfs()
            path.pop()
            used[i] = False

    dfs()
    return res
