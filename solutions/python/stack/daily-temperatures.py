# LeetCode 739 — Daily Temperatures (Medium)
# Category: Stack · Approach: Monotonic Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/daily-temperatures/

def daily_temperatures(temperatures: list[int]) -> list[int]:
    answer = [0] * len(temperatures)
    stack: list[int] = []  # indices, temps decreasing
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer
