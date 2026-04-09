# LeetCode 30 — Substring with Concatenation of All Words (Hard)
# Category: Sliding Window · Approach: Hash Map Window
# Time: O(n*m) | Space: O(m)
# Source: https://leetcode.com/problems/substring-with-concatenation-of-all-words/

def find_substring(s: str, words: list[str]) -> list[int]:
    if not words:
        return []
    word_len = len(words[0])
    count = len(words)
    total = word_len * count
    need: dict[str, int] = {}
    for w in words:
        need[w] = need.get(w, 0) + 1
    res: list[int] = []
    for i in range(len(s) - total + 1):
        seen: dict[str, int] = {}
        ok = True
        for j in range(count):
            chunk = s[i + j * word_len:i + (j + 1) * word_len]
            if chunk not in need:
                ok = False
                break
            seen[chunk] = seen.get(chunk, 0) + 1
            if seen[chunk] > need[chunk]:
                ok = False
                break
        if ok:
            res.append(i)
    return res
