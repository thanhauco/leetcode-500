# LeetCode 40 — Combination Sum II (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(2^n) | Space: O(n)
# Source: https://leetcode.com/problems/combination-sum-ii/

def combination_sum2(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    res: list[list[int]] = []
    path: list[int] = []

    def bt(start: int, remain: int) -> None:
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            bt(i + 1, remain - candidates[i])
            path.pop()

    bt(0, target)
    return res
