# LeetCode 720 — Longest Word in Dictionary (Medium)
# Category: Tries · Approach: Set + sort
# Time: O(Σ word length) | Space: O(Σ word length)
# Source: https://leetcode.com/problems/longest-word-in-dictionary/

def longest_word(words: list[str]) -> str:
    word_set = set(words)
    best = ""
    for w in sorted(words):
        if all(w[:i] in word_set for i in range(1, len(w))):
            if len(w) > len(best):
                best = w
    return best
