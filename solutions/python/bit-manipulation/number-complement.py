# LeetCode 476 — Number Complement (Easy)
# Category: Bit Manipulation · Approach: Mask and XOR
# Time: O(log num) | Space: O(1)
# Source: https://leetcode.com/problems/number-complement/

def find_complement(num: int) -> int:
    mask = 1
    while mask < num:
        mask = (mask << 1) | 1
    return num ^ mask
