// LeetCode 443 — String Compression (Medium)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/string-compression/

function compress(chars: string[]): number {
  let write = 0;
  let read = 0;
  const n = chars.length;
  while (read < n) {
    const ch = chars[read];
    let count = 0;
    while (read < n && chars[read] === ch) { read++; count++; }
    chars[write++] = ch;
    if (count > 1) {
      for (const d of String(count)) chars[write++] = d;
    }
  }
  return write;
}
