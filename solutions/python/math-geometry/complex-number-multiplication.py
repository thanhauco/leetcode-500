# LeetCode 537 — Complex Number Multiplication (Medium)
# Category: Math & Geometry · Approach: Parse and multiply
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/complex-number-multiplication/

def complex_number_multiply(num1: str, num2: str) -> str:
    def parse(s: str) -> tuple[int, int]:
        a, b = s.split("+")
        return int(a), int(b[:-1])

    a, b = parse(num1)
    c, d = parse(num2)
    real = a * c - b * d
    imag = a * d + b * c
    return f"{real}+{imag}i"
