# LeetCode 421 — Maximum XOR of Two Numbers in an Array (Medium)
# Category: Bit Manipulation · Approach: Greedy prefix set
# Time: O(32n) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/

def find_maximum_xor(nums: list[int]) -> int:
    max_xor = 0
    mask = 0
    for bit in range(30, -1, -1):
        mask |= (1 << bit)
        prefixes = {n & mask for n in nums}
        candidate = max_xor | (1 << bit)
        if any((candidate ^ p) in prefixes for p in prefixes):
            max_xor = candidate
    return max_xor
