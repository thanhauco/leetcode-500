# LeetCode 424 — Longest Repeating Character Replacement (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/longest-repeating-character-replacement/

def character_replacement(s: str, k: int) -> int:
    count: dict[str, int] = {}
    left = max_freq = res = 0
    for right, c in enumerate(s):
        count[c] = count.get(c, 0) + 1
        max_freq = max(max_freq, count[c])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        res = max(res, right - left + 1)
    return res
