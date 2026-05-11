# LeetCode 1208 — Get Equal Substrings Within Budget (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/get-equal-substrings-within-budget/

def equal_substring(s: str, t: str, max_cost: int) -> int:
    left = cost = best = 0
    for right in range(len(s)):
        cost += abs(ord(s[right]) - ord(t[right]))
        while cost > max_cost:
            cost -= abs(ord(s[left]) - ord(t[left]))
            left += 1
        best = max(best, right - left + 1)
    return best
