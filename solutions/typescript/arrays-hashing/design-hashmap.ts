// LeetCode 706 — Design HashMap (Easy)
// Category: Arrays & Hashing · Approach: Bucket Chaining
// Time: O(1) average | Space: O(n)
// Source: https://leetcode.com/problems/design-hashmap/

class MyHashMap {
  private buckets: [number, number][][] = Array.from({ length: 1000 }, () => []);

  private bucket(key: number): [number, number][] {
    return this.buckets[key % 1000];
  }

  put(key: number, value: number): void {
    const b = this.bucket(key);
    for (const pair of b) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    b.push([key, value]);
  }

  get(key: number): number {
    for (const [k, v] of this.bucket(key)) {
      if (k === key) return v;
    }
    return -1;
  }

  remove(key: number): void {
    const b = this.bucket(key);
    const i = b.findIndex((p) => p[0] === key);
    if (i !== -1) b.splice(i, 1);
  }
}
