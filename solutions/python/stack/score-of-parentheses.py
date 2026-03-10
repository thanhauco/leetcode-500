# LeetCode 856 — Score of Parentheses (Medium)
# Category: Stack · Approach: Depth stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/score-of-parentheses/

def score_of_parentheses(s: str) -> int:
    stack: list[int] = [0]
    for c in s:
        if c == "(":
            stack.append(0)
        else:
            v = stack.pop()
            stack[-1] += max(2 * v, 1)
    return stack[0]
