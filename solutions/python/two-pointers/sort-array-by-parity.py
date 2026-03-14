# LeetCode 905 — Sort Array By Parity (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/sort-array-by-parity/

def sort_array_by_parity(nums: list[int]) -> list[int]:
    res = nums[:]
    l, r = 0, len(res) - 1
    while l < r:
        if res[l] % 2 == 0:
            l += 1
        elif res[r] % 2 == 1:
            r -= 1
        else:
            res[l], res[r] = res[r], res[l]
            l += 1
            r -= 1
    return res
