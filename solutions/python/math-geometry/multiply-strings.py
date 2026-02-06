# LeetCode 43 — Multiply Strings (Medium)
# Category: Math & Geometry · Approach: Grade-School
# Time: O(m·n) | Space: O(m + n)
# Source: https://leetcode.com/problems/multiply-strings/

def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    m, n = len(num1), len(num2)
    pos = [0] * (m + n)
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = (ord(num1[i]) - 48) * (ord(num2[j]) - 48)
            p1, p2 = i + j, i + j + 1
            total = mul + pos[p2]
            pos[p2] = total % 10
            pos[p1] += total // 10
    res = "".join(map(str, pos)).lstrip("0")
    return res or "0"
