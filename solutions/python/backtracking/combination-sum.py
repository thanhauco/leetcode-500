# LeetCode 39 — Combination Sum (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(n^(T/m)) | Space: O(T/m)
# Source: https://leetcode.com/problems/combination-sum/

def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int, remain: int) -> None:
        if remain == 0:
            res.append(path[:])
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            dfs(i, remain - candidates[i])
            path.pop()

    dfs(0, target)
    return res
