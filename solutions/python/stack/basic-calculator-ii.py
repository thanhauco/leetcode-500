# LeetCode 227 — Basic Calculator II (Medium)
# Category: Stack · Approach: Operator stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/basic-calculator-ii/

def calculate(s: str) -> int:
    stack: list[int] = []
    num = 0
    op = "+"
    for i, c in enumerate(s):
        if c.isdigit():
            num = num * 10 + int(c)
        if (not c.isdigit() and c != " ") or i == len(s) - 1:
            if op == "+":
                stack.append(num)
            elif op == "-":
                stack.append(-num)
            elif op == "*":
                stack.append(stack.pop() * num)
            else:
                prev = stack.pop()
                stack.append(int(prev / num))
            op = c
            num = 0
    return sum(stack)
