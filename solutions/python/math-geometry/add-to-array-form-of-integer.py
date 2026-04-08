# LeetCode 989 — Add to Array-Form of Integer (Easy)
# Category: Math & Geometry · Approach: Carry Sweep
# Time: O(max(n, log k)) | Space: O(max(n, log k))
# Source: https://leetcode.com/problems/add-to-array-form-of-integer/

def add_to_array_form(num: list[int], k: int) -> list[int]:
    res: list[int] = []
    i = len(num) - 1
    carry = k
    while i >= 0 or carry > 0:
        if i >= 0:
            carry += num[i]
            i -= 1
        res.append(carry % 10)
        carry //= 10
    res.reverse()
    return res
