# LeetCode 47 — Permutations II (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(n · n!) | Space: O(n)
# Source: https://leetcode.com/problems/permutations-ii/

def permute_unique(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res: list[list[int]] = []
    path: list[int] = []
    used = [False] * len(nums)

    def bt() -> None:
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue
            used[i] = True
            path.append(nums[i])
            bt()
            path.pop()
            used[i] = False

    bt()
    return res
