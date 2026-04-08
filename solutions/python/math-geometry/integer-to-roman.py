# LeetCode 12 — Integer to Roman (Medium)
# Category: Math & Geometry · Approach: Greedy Table
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/integer-to-roman/

def int_to_roman(num: int) -> str:
    pairs = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ]
    out: list[str] = []
    for value, symbol in pairs:
        while num >= value:
            out.append(symbol)
            num -= value
    return "".join(out)
