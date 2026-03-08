# LeetCode 1456 — Maximum Number of Vowels in a Substring of Given Length (Medium)
# Category: Sliding Window · Approach: Fixed Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

def max_vowels(s: str, k: int) -> int:
    vowels = set("aeiou")
    count = best = 0
    for i, ch in enumerate(s):
        if ch in vowels:
            count += 1
        if i >= k and s[i - k] in vowels:
            count -= 1
        if i >= k - 1:
            best = max(best, count)
    return best
