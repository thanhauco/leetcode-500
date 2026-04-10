# LeetCode 921 — Minimum Add to Make Parentheses Valid (Medium)
# Category: Stack · Approach: Balance counter
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/

def min_add_to_make_valid(s: str) -> int:
    open_count = 0
    adds = 0
    for ch in s:
        if ch == "(":
            open_count += 1
        elif open_count > 0:
            open_count -= 1
        else:
            adds += 1
    return adds + open_count
