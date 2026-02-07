# LeetCode 76 — Minimum Window Substring (Hard)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n + m) | Space: O(m)
# Source: https://leetcode.com/problems/minimum-window-substring/

def min_window(s: str, t: str) -> str:
    if not t or len(s) < len(t):
        return ""
    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1
    required = len(need)
    formed = 0
    window = {}
    best = (float("inf"), 0, 0)
    left = 0
    for right, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)
            lc = s[left]
            window[lc] -= 1
            if lc in need and window[lc] < need[lc]:
                formed -= 1
            left += 1
    return "" if best[0] == float("inf") else s[best[1]:best[2] + 1]
