# LeetCode 491 — Non-decreasing Subsequences (Medium)
# Category: Backtracking · Approach: DFS with level dedup
# Time: O(2^n · n) | Space: O(n)
# Source: https://leetcode.com/problems/non-decreasing-subsequences/

def find_subsequences(nums: list[int]) -> list[list[int]]:
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int) -> None:
        if len(path) >= 2:
            res.append(path[:])
        used: set[int] = set()
        for i in range(start, len(nums)):
            if (not path or nums[i] >= path[-1]) and nums[i] not in used:
                used.add(nums[i])
                path.append(nums[i])
                dfs(i + 1)
                path.pop()

    dfs(0)
    return res
