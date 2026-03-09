# LeetCode 32 — Longest Valid Parentheses (Hard)
# Category: Stack · Approach: Index stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/longest-valid-parentheses/

def longest_valid_parentheses(s: str) -> int:
    max_len = 0
    stack: list[int] = [-1]
    for i, c in enumerate(s):
        if c == "(":
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    return max_len
