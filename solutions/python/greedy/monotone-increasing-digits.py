# LeetCode 738 — Monotone Increasing Digits (Medium)
# Category: Greedy · Approach: Greedy from right
# Time: O(d) | Space: O(d)
# Source: https://leetcode.com/problems/monotone-increasing-digits/

def monotone_increasing_digits(n: int) -> int:
    d = list(map(int, str(n)))
    mark = len(d)
    for i in range(len(d) - 1, 0, -1):
        if d[i - 1] > d[i]:
            d[i - 1] -= 1
            mark = i
    for i in range(mark, len(d)):
        d[i] = 9
    return int("".join(map(str, d)))
