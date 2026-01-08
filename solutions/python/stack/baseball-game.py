# LeetCode 682 — Baseball Game (Easy)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/baseball-game/

def cal_points(operations: list[str]) -> int:
    stack: list[int] = []
    for op in operations:
        if op == "+":
            stack.append(stack[-1] + stack[-2])
        elif op == "D":
            stack.append(2 * stack[-1])
        elif op == "C":
            stack.pop()
        else:
            stack.append(int(op))
    return sum(stack)
