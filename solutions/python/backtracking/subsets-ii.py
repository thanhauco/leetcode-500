# LeetCode 90 — Subsets II (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(n·2^n) | Space: O(n)
# Source: https://leetcode.com/problems/subsets-ii/

def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    nums = sorted(nums)
    res: list[list[int]] = []
    path: list[int] = []

    def dfs(start: int) -> None:
        res.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            dfs(i + 1)
            path.pop()

    dfs(0)
    return res
