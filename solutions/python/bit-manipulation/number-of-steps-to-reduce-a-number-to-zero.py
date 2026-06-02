# LeetCode 1342 — Number of Steps to Reduce a Number to Zero (Easy)
# Category: Bit Manipulation · Approach: Simulate
# Time: O(log num) | Space: O(1)
# Source: https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/

def number_of_steps(num: int) -> int:
    steps = 0
    while num > 0:
        if num & 1:
            num -= 1
        else:
            num //= 2
        steps += 1
    return steps
