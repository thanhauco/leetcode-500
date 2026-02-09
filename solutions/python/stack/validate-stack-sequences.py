# LeetCode 946 — Validate Stack Sequences (Medium)
# Category: Stack · Approach: Simulation
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/validate-stack-sequences/

def validate_stack_sequences(pushed: list[int], popped: list[int]) -> bool:
    stack: list[int] = []
    j = 0
    for x in pushed:
        stack.append(x)
        while stack and stack[-1] == popped[j]:
            stack.pop()
            j += 1
    return not stack
