# LeetCode 84 — Largest Rectangle in Histogram (Hard)
# Category: Stack · Approach: Monotonic stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/largest-rectangle-in-histogram/

def largest_rectangle_area(heights: list[int]) -> int:
    stack: list[int] = []
    max_area = 0
    n = len(heights)
    for i in range(n + 1):
        h = 0 if i == n else heights[i]
        while stack and heights[stack[-1]] >= h:
            top = stack.pop()
            height = heights[top]
            width = i - stack[-1] - 1 if stack else i
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
