# LeetCode 187 — Repeated DNA Sequences (Medium)
# Category: Sliding Window · Approach: Hash Set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/repeated-dna-sequences/

def find_repeated_dna_sequences(s: str) -> list[str]:
    seen, res = set(), set()
    for i in range(len(s) - 9):
        sub = s[i:i + 10]
        if sub in seen:
            res.add(sub)
        else:
            seen.add(sub)
    return list(res)
