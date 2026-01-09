# LeetCode 150 — Evaluate Reverse Polish Notation (Medium)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/evaluate-reverse-polish-notation/

def eval_rpn(tokens: list[str]) -> int:
    stack: list[int] = []
    ops = {"+", "-", "*", "/"}
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(t))
    return stack.pop()
