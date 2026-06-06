# LeetCode 445 — Add Two Numbers II (Medium)
# Category: Linked List · Approach: Reverse + add
# Time: O(m + n) | Space: O(m + n)
# Source: https://leetcode.com/problems/add-two-numbers-ii/

def add_two_numbers(l1: list[int], l2: list[int]) -> list[int]:
    a, b = l1[::-1], l2[::-1]
    out = []
    carry = 0
    i = 0
    while i < len(a) or i < len(b) or carry:
        total = carry
        if i < len(a):
            total += a[i]
        if i < len(b):
            total += b[i]
        out.append(total % 10)
        carry = total // 10
        i += 1
    return out[::-1]
