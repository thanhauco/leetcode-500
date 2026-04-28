// LeetCode 677 — Map Sum Pairs (Medium)
// Category: Tries · Approach: Map + prefix scan
// Time: O(k) per sum | Space: O(total keys)
// Source: https://leetcode.com/problems/map-sum-pairs/

class MapSum {
  private values = new Map<string, number>();

  insert(key: string, val: number): void {
    this.values.set(key, val);
  }

  sum(prefix: string): number {
    let total = 0;
    for (const [key, val] of this.values) {
      if (key.startsWith(prefix)) total += val;
    }
    return total;
  }
}
