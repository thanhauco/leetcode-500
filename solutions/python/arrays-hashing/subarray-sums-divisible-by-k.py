# LeetCode 974 — Subarray Sums Divisible by K (Medium)
# Category: Arrays & Hashing · Approach: Prefix Remainders
# Time: O(n) | Space: O(k)
# Source: https://leetcode.com/problems/subarray-sums-divisible-by-k/

def subarrays_div_by_k(nums: list[int], k: int) -> int:
    counts = {0: 1}
    total = res = 0
    for x in nums:
        total += x
        r = total % k  # Python keeps this non-negative for positive k
        res += counts.get(r, 0)
        counts[r] = counts.get(r, 0) + 1
    return res
