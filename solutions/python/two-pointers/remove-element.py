# LeetCode 27 — Remove Element (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/remove-element/

def remove_element(nums: list[int], val: int) -> int:
    k = 0
    for x in nums:
        if x != val:
            nums[k] = x
            k += 1
    return k
