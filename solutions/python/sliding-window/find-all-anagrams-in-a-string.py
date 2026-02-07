# LeetCode 438 — Find All Anagrams in a String (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/find-all-anagrams-in-a-string/

def find_anagrams(s: str, p: str) -> list[int]:
    if len(s) < len(p):
        return []
    need = [0] * 26
    win = [0] * 26
    for ch in p:
        need[ord(ch) - 97] += 1
    res = []
    for i, ch in enumerate(s):
        win[ord(ch) - 97] += 1
        if i >= len(p):
            win[ord(s[i - len(p)]) - 97] -= 1
        if i >= len(p) - 1 and win == need:
            res.append(i - len(p) + 1)
    return res
