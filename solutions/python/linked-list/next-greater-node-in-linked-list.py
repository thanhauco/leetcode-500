# LeetCode 1019 — Next Greater Node In Linked List (Medium)
# Category: Linked List · Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/next-greater-node-in-linked-list/

def next_larger_nodes(values: list[int]) -> list[int]:
    res = [0] * len(values)
    stack: list[int] = []  # indices waiting for a greater value
    for i, v in enumerate(values):
        while stack and values[stack[-1]] < v:
            res[stack.pop()] = v
        stack.append(i)
    return res
