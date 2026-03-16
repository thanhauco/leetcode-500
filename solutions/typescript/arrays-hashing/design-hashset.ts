// LeetCode 705 — Design HashSet (Easy)
// Category: Arrays & Hashing · Approach: Bucket Chaining
// Time: O(1) average | Space: O(n)
// Source: https://leetcode.com/problems/design-hashset/

class MyHashSet {
  private buckets: number[][] = Array.from({ length: 1000 }, () => []);

  private bucket(key: number): number[] {
    return this.buckets[key % 1000];
  }

  add(key: number): void {
    const b = this.bucket(key);
    if (!b.includes(key)) b.push(key);
  }

  remove(key: number): void {
    const b = this.bucket(key);
    const i = b.indexOf(key);
    if (i !== -1) b.splice(i, 1);
  }

  contains(key: number): boolean {
    return this.bucket(key).includes(key);
  }
}
