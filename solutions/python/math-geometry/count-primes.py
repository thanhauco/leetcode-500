# LeetCode 204 — Count Primes (Medium)
# Category: Math & Geometry · Approach: Sieve
# Time: O(n log log n) | Space: O(n)
# Source: https://leetcode.com/problems/count-primes/

def count_primes(n: int) -> int:
    if n <= 2:
        return 0
    sieve = [True] * n
    sieve[0] = sieve[1] = False
    p = 2
    while p * p < n:
        if sieve[p]:
            for multiple in range(p * p, n, p):
                sieve[multiple] = False
        p += 1
    return sum(sieve)
