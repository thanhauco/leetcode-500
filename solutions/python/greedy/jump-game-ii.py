# LeetCode 45 — Jump Game II (Medium)
# Category: Greedy · Approach: Greedy Windows
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/jump-game-ii/

def jump(nums: list[int]) -> int:
    jumps = cur_end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps
