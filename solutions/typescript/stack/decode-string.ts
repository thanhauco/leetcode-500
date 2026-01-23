// LeetCode 394 — Decode String (Medium)
// Category: Stack · Approach: Two Stacks
// Time: O(output length) | Space: O(output length)
// Source: https://leetcode.com/problems/decode-string/

function decodeString(s: string): string {
  const numStack: number[] = [];
  const strStack: string[] = [];
  let cur = "";
  let num = 0;
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "[") {
      numStack.push(num);
      strStack.push(cur);
      num = 0;
      cur = "";
    } else if (c === "]") {
      const rep = numStack.pop()!;
      cur = strStack.pop()! + cur.repeat(rep);
    } else {
      cur += c;
    }
  }
  return cur;
}
