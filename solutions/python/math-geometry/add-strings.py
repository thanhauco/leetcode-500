# LeetCode 415 — Add Strings (Easy)
# Category: Math & Geometry · Approach: Column Addition
# Time: O(max(n, m)) | Space: O(max(n, m))
# Source: https://leetcode.com/problems/add-strings/

def add_strings(num1: str, num2: str) -> str:
    i, j = len(num1) - 1, len(num2) - 1
    carry = 0
    out: list[str] = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += ord(num1[i]) - ord("0")
            i -= 1
        if j >= 0:
            total += ord(num2[j]) - ord("0")
            j -= 1
        out.append(str(total % 10))
        carry = total // 10
    return "".join(reversed(out))
