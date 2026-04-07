# LeetCode 67 — Add Binary (Easy)
# Category: Math & Geometry · Approach: Column Addition
# Time: O(max(n, m)) | Space: O(max(n, m))
# Source: https://leetcode.com/problems/add-binary/

def add_binary(a: str, b: str) -> str:
    i, j = len(a) - 1, len(b) - 1
    carry = 0
    out: list[str] = []
    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += ord(a[i]) - ord("0")
            i -= 1
        if j >= 0:
            total += ord(b[j]) - ord("0")
            j -= 1
        out.append(str(total & 1))
        carry = total >> 1
    return "".join(reversed(out))
