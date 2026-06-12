# LeetCode 1804 — Implement Trie II (Prefix Tree) (Medium)
# Category: Tries · Approach: Counting trie
# Time: O(L) per op | Space: O(total chars)
# Source: https://leetcode.com/problems/implement-trie-ii-prefix-tree/

class Trie:
    def __init__(self):
        self.ch: dict = {}
        self.pre = 0
        self.end = 0

    def insert(self, word: str) -> None:
        node = self
        for c in word:
            node = node.ch.setdefault(c, Trie())
            node.pre += 1
        node.end += 1

    def _find(self, s: str):
        node = self
        for c in s:
            if c not in node.ch:
                return None
            node = node.ch[c]
        return node

    def countWordsEqualTo(self, word: str) -> int:
        n = self._find(word)
        return n.end if n else 0

    def countWordsStartingWith(self, prefix: str) -> int:
        n = self._find(prefix)
        return n.pre if n else 0

    def erase(self, word: str) -> None:
        node = self
        for c in word:
            child = node.ch[c]
            child.pre -= 1
            if child.pre == 0:
                del node.ch[c]
                return
            node = child
        node.end -= 1
