# LeetCode 706 — Design HashMap (Easy)
# Category: Arrays & Hashing · Approach: Bucket Chaining
# Time: O(1) average | Space: O(n)
# Source: https://leetcode.com/problems/design-hashmap/

class MyHashMap:
    def __init__(self) -> None:
        self.buckets: list[list[tuple[int, int]]] = [[] for _ in range(1000)]

    def _bucket(self, key: int) -> list[tuple[int, int]]:
        return self.buckets[key % 1000]

    def put(self, key: int, value: int) -> None:
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b[i] = (key, value)
                return
        b.append((key, value))

    def get(self, key: int) -> int:
        for k, v in self._bucket(key):
            if k == key:
                return v
        return -1

    def remove(self, key: int) -> None:
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b.pop(i)
                return
