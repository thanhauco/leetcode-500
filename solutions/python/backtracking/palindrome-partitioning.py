# LeetCode 131 — Palindrome Partitioning (Medium)
# Category: Backtracking · Approach: Backtracking
# Time: O(n · 2^n) | Space: O(n)
# Source: https://leetcode.com/problems/palindrome-partitioning/

def partition(s: str) -> list[list[str]]:
    res: list[list[str]] = []
    path: list[str] = []

    def is_pal(l: int, r: int) -> bool:
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    def bt(start: int) -> None:
        if start == len(s):
            res.append(path[:])
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start:end + 1])
                bt(end + 1)
                path.pop()

    bt(0)
    return res
