# LeetCode 520 — Detect Capital (Easy)
# Category: Arrays & Hashing · Approach: Pattern Check
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/detect-capital/

def detect_capital_use(word: str) -> bool:
    return word.isupper() or word.islower() or word.istitle()
