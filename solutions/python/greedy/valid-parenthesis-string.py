# LeetCode 678 — Valid Parenthesis String (Medium)
# Category: Greedy · Approach: Greedy Range
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/valid-parenthesis-string/

def check_valid_string(s: str) -> bool:
    lo = hi = 0
    for ch in s:
        if ch == "(":
            lo += 1
            hi += 1
        elif ch == ")":
            lo -= 1
            hi -= 1
        else:
            lo -= 1
            hi += 1
        if hi < 0:
            return False
        if lo < 0:
            lo = 0
    return lo == 0
