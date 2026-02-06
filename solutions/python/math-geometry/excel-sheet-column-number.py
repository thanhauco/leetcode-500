# LeetCode 171 — Excel Sheet Column Number (Easy)
# Category: Math & Geometry · Approach: Base-26
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/excel-sheet-column-number/

def title_to_number(column_title: str) -> int:
    result = 0
    for ch in column_title:
        result = result * 26 + (ord(ch) - 64)
    return result
