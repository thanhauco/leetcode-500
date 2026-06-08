# LeetCode 1281 — Subtract the Product and Sum of Digits of an Integer (Easy)
# Category: Math & Geometry · Approach: Digit walk
# Time: O(log n) | Space: O(1)
# Source: https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/

def subtract_product_and_sum(n: int) -> int:
    product, total = 1, 0
    while n > 0:
        d = n % 10
        product *= d
        total += d
        n //= 10
    return product - total
