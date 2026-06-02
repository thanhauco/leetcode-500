# LeetCode 389 — Find the Difference (Easy)
# Category: Bit Manipulation · Approach: XOR codes
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/find-the-difference/

def find_the_difference(s: str, t: str) -> str:
    x = 0
    for c in s:
        x ^= ord(c)
    for c in t:
        x ^= ord(c)
    return chr(x)
