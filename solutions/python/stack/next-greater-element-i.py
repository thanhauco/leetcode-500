# LeetCode 496 — Next Greater Element I (Easy)
# Category: Stack · Approach: Monotonic Stack
# Time: O(n + m) | Space: O(n)
# Source: https://leetcode.com/problems/next-greater-element-i/

def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    nge: dict[int, int] = {}
    stack: list[int] = []
    for x in nums2:
        while stack and stack[-1] < x:
            nge[stack.pop()] = x
        stack.append(x)
    return [nge.get(x, -1) for x in nums1]
