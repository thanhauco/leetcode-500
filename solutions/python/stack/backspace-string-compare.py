# LeetCode 844 — Backspace String Compare (Easy)
# Category: Stack · Approach: Stack
# Time: O(n + m) | Space: O(n + m)
# Source: https://leetcode.com/problems/backspace-string-compare/

def backspace_compare(s: str, t: str) -> bool:
    def build(text: str) -> str:
        stack: list[str] = []
        for c in text:
            if c == "#":
                if stack:
                    stack.pop()
            else:
                stack.append(c)
        return "".join(stack)

    return build(s) == build(t)
