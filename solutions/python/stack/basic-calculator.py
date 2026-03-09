# LeetCode 224 — Basic Calculator (Hard)
# Category: Stack · Approach: Sign stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/basic-calculator/

def calculate(s: str) -> int:
    result = 0
    sign = 1
    num = 0
    stack: list[int] = []
    for c in s:
        if c.isdigit():
            num = num * 10 + int(c)
        elif c == "+":
            result += sign * num
            num, sign = 0, 1
        elif c == "-":
            result += sign * num
            num, sign = 0, -1
        elif c == "(":
            stack.append(result)
            stack.append(sign)
            result, sign = 0, 1
        elif c == ")":
            result += sign * num
            num = 0
            result *= stack.pop()
            result += stack.pop()
    return result + sign * num
