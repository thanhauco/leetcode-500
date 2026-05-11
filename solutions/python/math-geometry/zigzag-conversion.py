# LeetCode 6 — Zigzag Conversion (Medium)
# Category: Math & Geometry · Approach: Row Simulation
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/zigzag-conversion/

def convert(s: str, num_rows: int) -> str:
    if num_rows == 1:
        return s
    rows = [""] * num_rows
    row, step = 0, 1
    for c in s:
        rows[row] += c
        if row == 0:
            step = 1
        elif row == num_rows - 1:
            step = -1
        row += step
    return "".join(rows)
