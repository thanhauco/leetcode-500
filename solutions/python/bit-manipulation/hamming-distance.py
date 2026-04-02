# LeetCode 461 — Hamming Distance (Easy)
# Category: Bit Manipulation · Approach: XOR + Popcount
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/hamming-distance/

def hamming_distance(x: int, y: int) -> int:
    z = x ^ y
    count = 0
    while z:
        z &= z - 1
        count += 1
    return count
