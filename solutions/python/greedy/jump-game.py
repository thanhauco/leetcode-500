# LeetCode 55 — Jump Game (Medium)
# Category: Greedy · Approach: Greedy
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/jump-game/

def can_jump(nums: list[int]) -> bool:
    reach = 0
    for i, n in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + n)
    return True
