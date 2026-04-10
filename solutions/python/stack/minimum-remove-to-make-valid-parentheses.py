# LeetCode 1249 — Minimum Remove to Make Valid Parentheses (Medium)
# Category: Stack · Approach: Index stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

def min_remove_to_make_valid(s: str) -> str:
    chars = list(s)
    stack: list[int] = []
    for i, ch in enumerate(chars):
        if ch == "(":
            stack.append(i)
        elif ch == ")":
            if stack:
                stack.pop()
            else:
                chars[i] = ""
    for i in stack:
        chars[i] = ""
    return "".join(chars)
