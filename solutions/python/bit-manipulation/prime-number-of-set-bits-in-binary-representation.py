# LeetCode 762 — Prime Number of Set Bits in Binary Representation (Easy)
# Category: Bit Manipulation · Approach: Popcount and check
# Time: O((right − left)·log right) | Space: O(1)
# Source: https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/

def count_prime_set_bits(left: int, right: int) -> int:
    primes = {2, 3, 5, 7, 11, 13, 17, 19}
    return sum(1 for x in range(left, right + 1) if bin(x).count("1") in primes)
