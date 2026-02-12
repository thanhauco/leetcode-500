# LeetCode 151 — Reverse Words in a String (Medium)
# Category: Two Pointers · Approach: Split & Reverse
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/reverse-words-in-a-string/

def reverse_words(s: str) -> str:
    return " ".join(reversed(s.split()))
