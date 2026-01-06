# LeetCode 412 — Fizz Buzz (Easy)
# Category: Math & Geometry · Approach: Simulation
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/fizz-buzz/

def fizz_buzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        label = ""
        if i % 3 == 0:
            label += "Fizz"
        if i % 5 == 0:
            label += "Buzz"
        result.append(label or str(i))
    return result
