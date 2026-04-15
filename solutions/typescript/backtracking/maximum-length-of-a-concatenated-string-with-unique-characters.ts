// LeetCode 1239 — Maximum Length of a Concatenated String with Unique Characters (Medium)
// Category: Backtracking · Approach: Bitmask backtracking
// Time: O(2^n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/

function maxLength(arr: string[]): number {
  const masks: [number, number][] = [];
  for (const s of arr) {
    let m = 0;
    let ok = true;
    for (const ch of s) {
      const b = 1 << (ch.charCodeAt(0) - 97);
      if (m & b) {
        ok = false;
        break;
      }
      m |= b;
    }
    if (ok) masks.push([m, s.length]);
  }
  let best = 0;
  const dfs = (i: number, cur: number, length: number): void => {
    best = Math.max(best, length);
    for (let j = i; j < masks.length; j++) {
      const [mask, size] = masks[j];
      if ((cur & mask) === 0) dfs(j + 1, cur | mask, length + size);
    }
  };
  dfs(0, 0, 0);
  return best;
}
