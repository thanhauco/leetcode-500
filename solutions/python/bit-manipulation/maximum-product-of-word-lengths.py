# LeetCode 318 — Maximum Product of Word Lengths (Medium)
# Category: Bit Manipulation · Approach: Letter bitmask
# Time: O(n² + total) | Space: O(n)
# Source: https://leetcode.com/problems/maximum-product-of-word-lengths/

def max_product(words: list[str]) -> int:
    masks = []
    for w in words:
        m = 0
        for c in w:
            m |= 1 << (ord(c) - 97)
        masks.append(m)
    best = 0
    for i in range(len(words)):
        for j in range(i + 1, len(words)):
            if masks[i] & masks[j] == 0:
                best = max(best, len(words[i]) * len(words[j]))
    return best
