# LeetCode 1005 — Maximize Sum Of Array After K Negations (Easy)
# Category: Greedy · Approach: Sort + flip
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/

def largest_sum_after_k_negations(nums: list[int], k: int) -> int:
    nums = sorted(nums)
    i = 0
    while i < len(nums) and k > 0 and nums[i] < 0:
        nums[i] = -nums[i]
        k -= 1
        i += 1
    total = sum(nums)
    if k % 2 == 1:
        total -= 2 * min(nums)
    return total
