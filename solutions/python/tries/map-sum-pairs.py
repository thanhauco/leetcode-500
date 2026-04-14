# LeetCode 677 — Map Sum Pairs (Medium)
# Category: Tries · Approach: Trie of running sums
# Time: O(k) per sum | Space: O(total keys)
# Source: https://leetcode.com/problems/map-sum-pairs/

class MapSum:
    def __init__(self) -> None:
        self.values: dict[str, int] = {}
        self.prefixes: dict[str, int] = {}

    def insert(self, key: str, val: int) -> None:
        delta = val - self.values.get(key, 0)
        self.values[key] = val
        prefix = ""
        for ch in key:
            prefix += ch
            self.prefixes[prefix] = self.prefixes.get(prefix, 0) + delta

    def sum(self, prefix: str) -> int:
        return self.prefixes.get(prefix, 0)
