# LeetCode 211 — Design Add and Search Words Data Structure (Medium)
# Category: Tries · Approach: Trie + DFS
# Time: O(L) add, O(26^d·L) search | Space: O(total chars)
# Source: https://leetcode.com/problems/design-add-and-search-words-data-structure/

class WordDictionary:
    def __init__(self):
        self.root: dict = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True

    def search(self, word: str) -> bool:
        def dfs(node: dict, i: int) -> bool:
            if i == len(word):
                return "$" in node
            ch = word[i]
            if ch == ".":
                return any(dfs(child, i + 1) for key, child in node.items() if key != "$")
            return ch in node and dfs(node[ch], i + 1)

        return dfs(self.root, 0)
