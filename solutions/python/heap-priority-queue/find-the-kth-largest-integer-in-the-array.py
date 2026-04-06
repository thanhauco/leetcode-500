# LeetCode 1985 — Find the Kth Largest Integer in the Array (Medium)
# Category: Heap / Priority Queue · Approach: Length-then-lex sort
# Time: O(n log n · L) | Space: O(n)
# Source: https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/

def kth_largest_number(nums: list[str], k: int) -> str:
    nums.sort(key=lambda s: (len(s), s))
    return nums[len(nums) - k]
