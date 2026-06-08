# LeetCode 1358 — Number of Substrings Containing All Three Characters (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/

def number_of_substrings(s: str) -> int:
    count = {"a": 0, "b": 0, "c": 0}
    left = 0
    res = 0
    for ch in s:
        count[ch] += 1
        while count["a"] > 0 and count["b"] > 0 and count["c"] > 0:
            count[s[left]] -= 1
            left += 1
        res += left
    return res
