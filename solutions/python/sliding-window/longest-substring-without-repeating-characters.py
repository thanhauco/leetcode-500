# LeetCode 3 — Longest Substring Without Repeating Characters (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(min(n, alphabet))
# Source: https://leetcode.com/problems/longest-substring-without-repeating-characters/

def length_of_longest_substring(s: str) -> int:
    seen: set[str] = set()
    left = best = 0
    for right, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[left])
            left += 1
        seen.add(ch)
        best = max(best, right - left + 1)
    return best
