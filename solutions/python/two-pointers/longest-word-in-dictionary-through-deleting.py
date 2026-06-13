# LeetCode 524 — Longest Word in Dictionary through Deleting (Medium)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(d · n) | Space: O(1)
# Source: https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/

def find_longest_word(s: str, dictionary: list[str]) -> str:
    best = ""
    for word in dictionary:
        i = 0
        for ch in s:
            if i < len(word) and ch == word[i]:
                i += 1
        if i == len(word):
            if len(word) > len(best) or (len(word) == len(best) and word < best):
                best = word
    return best
