# LeetCode 705 — Design HashSet (Easy)
# Category: Arrays & Hashing · Approach: Bucket Chaining
# Time: O(1) average | Space: O(n)
# Source: https://leetcode.com/problems/design-hashset/

class MyHashSet:
    def __init__(self) -> None:
        self.buckets: list[list[int]] = [[] for _ in range(1000)]

    def _bucket(self, key: int) -> list[int]:
        return self.buckets[key % 1000]

    def add(self, key: int) -> None:
        b = self._bucket(key)
        if key not in b:
            b.append(key)

    def remove(self, key: int) -> None:
        b = self._bucket(key)
        if key in b:
            b.remove(key)

    def contains(self, key: int) -> bool:
        return key in self._bucket(key)
