# LeetCode 290 — Word Pattern (Easy)
# Category: Arrays & Hashing · Approach: Two Maps
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/word-pattern/

def word_pattern(pattern: str, s: str) -> bool:
    words = s.split()
    if len(pattern) != len(words):
        return False
    p_to_w, w_to_p = {}, {}
    for p, w in zip(pattern, words):
        if p in p_to_w or w in w_to_p:
            if p_to_w.get(p) != w or w_to_p.get(w) != p:
                return False
        else:
            p_to_w[p] = w
            w_to_p[w] = p
    return True
