# LeetCode 20 — Valid Parentheses (Easy)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/valid-parentheses/

def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
