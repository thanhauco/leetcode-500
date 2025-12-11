# LeetCode 208 — Implement Trie (Prefix Tree) (Medium)
# Category: Tries · Approach: Nested dict
# Time: O(L) per op | Space: O(total chars)
# Source: https://leetcode.com/problems/implement-trie-prefix-tree/

class Trie:
    def __init__(self):
        self.root: dict = {}

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True  # word end

    def _find(self, s: str) -> dict | None:
        node = self.root
        for ch in s:
            if ch not in node:
                return None
            node = node[ch]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        return bool(node and node.get("$"))

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None
