# LeetCode 567 — Permutation in String (Medium)
# Category: Sliding Window · Approach: Fixed Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/permutation-in-string/

def check_inclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    need = [0] * 26
    win = [0] * 26
    base = ord("a")
    for c in s1:
        need[ord(c) - base] += 1
    for i, c in enumerate(s2):
        win[ord(c) - base] += 1
        if i >= len(s1):
            win[ord(s2[i - len(s1)]) - base] -= 1
        if win == need:
            return True
    return False
