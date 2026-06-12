# LeetCode 676 — Implement Magic Dictionary (Medium)
# Category: Tries · Approach: Mismatch scan
# Time: O(n·L) per search | Space: O(n·L)
# Source: https://leetcode.com/problems/implement-magic-dictionary/

class MagicDictionary:
    def __init__(self):
        self.words: list[str] = []

    def buildDict(self, dictionary: list[str]) -> None:
        self.words = dictionary

    def search(self, word: str) -> bool:
        for d in self.words:
            if len(d) != len(word):
                continue
            diff = sum(1 for a, b in zip(d, word) if a != b)
            if diff == 1:
                return True
        return False
