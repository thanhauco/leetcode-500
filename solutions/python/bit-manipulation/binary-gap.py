# LeetCode 868 — Binary Gap (Easy)
# Category: Bit Manipulation · Approach: Track last one
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/binary-gap/

def binary_gap(n: int) -> int:
    last, i, best = -1, 0, 0
    while n > 0:
        if n & 1:
            if last >= 0:
                best = max(best, i - last)
            last = i
        n >>= 1
        i += 1
    return best
