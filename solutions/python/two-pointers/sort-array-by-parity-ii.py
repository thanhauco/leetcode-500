# LeetCode 922 — Sort Array By Parity II (Medium)
# Category: Two Pointers · Approach: Two Cursors
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/sort-array-by-parity-ii/

def sort_array_by_parity_ii(nums: list[int]) -> list[int]:
    res = [0] * len(nums)
    even, odd = 0, 1
    for x in nums:
        if x % 2 == 0:
            res[even] = x
            even += 2
        else:
            res[odd] = x
            odd += 2
    return res
