# LeetCode 477 — Total Hamming Distance (Medium)
# Category: Bit Manipulation · Approach: Per-bit counting
# Time: O(32n) | Space: O(1)
# Source: https://leetcode.com/problems/total-hamming-distance/

def total_hamming_distance(nums: list[int]) -> int:
    n = len(nums)
    total = 0
    for bit in range(32):
        ones = sum((x >> bit) & 1 for x in nums)
        total += ones * (n - ones)
    return total
