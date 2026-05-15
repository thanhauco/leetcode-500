# LeetCode 557 — Reverse Words in a String III (Easy)
# Category: Two Pointers · Approach: Split & Reverse
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/reverse-words-in-a-string-iii/

def reverse_words(s: str) -> str:
    return " ".join(word[::-1] for word in s.split(" "))
