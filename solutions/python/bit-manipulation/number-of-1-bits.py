# LeetCode 191 — Number of 1 Bits (Easy)
# Category: Bit Manipulation · Approach: Kernighan
# Time: O(set bits) | Space: O(1)
# Source: https://leetcode.com/problems/number-of-1-bits/

def hamming_weight(n: int) -> int:
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
