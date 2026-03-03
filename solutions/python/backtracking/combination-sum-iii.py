# LeetCode 216 — Combination Sum III (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(C(9, k)) | Space: O(k)
# Source: https://leetcode.com/problems/combination-sum-iii/

def combination_sum3(k: int, n: int) -> list[list[int]]:
    res: list[list[int]] = []

    def dfs(start: int, need: int, remain: int, path: list[int]) -> None:
        if need == 0:
            if remain == 0:
                res.append(path[:])
            return
        for x in range(start, 10):
            if x > remain:
                break
            path.append(x)
            dfs(x + 1, need - 1, remain - x, path)
            path.pop()

    dfs(1, k, n, [])
    return res
