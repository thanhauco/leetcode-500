// LeetCode 318 — Maximum Product of Word Lengths (Medium)
// Category: Bit Manipulation · Approach: Letter bitmask
// Time: O(n² + total) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-product-of-word-lengths/

function maxProduct(words: string[]): number {
  const masks = words.map((w) => {
    let m = 0;
    for (const c of w) m |= 1 << (c.charCodeAt(0) - 97);
    return m;
  });
  let best = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        best = Math.max(best, words[i].length * words[j].length);
      }
    }
  }
  return best;
}
