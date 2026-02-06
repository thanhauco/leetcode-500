# LeetCode 168 — Excel Sheet Column Title (Easy)
# Category: Math & Geometry · Approach: Base-26
# Time: O(log n) | Space: O(log n)
# Source: https://leetcode.com/problems/excel-sheet-column-title/

def convert_to_title(column_number: int) -> str:
    res = []
    while column_number > 0:
        column_number -= 1
        res.append(chr(65 + column_number % 26))
        column_number //= 26
    return "".join(reversed(res))
