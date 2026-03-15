// LeetCode 127 — Word Ladder (Hard)
// Category: Advanced Graphs · Approach: BFS
// Time: O(N * L * 26) | Space: O(N * L)
// Source: https://leetcode.com/problems/word-ladder/

function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  const queue: [string, number][] = [[beginWord, 1]];
  words.delete(beginWord);
  let head = 0;
  while (head < queue.length) {
    const [word, steps] = queue[head++];
    if (word === endWord) return steps;
    const chars = word.split("");
    for (let i = 0; i < chars.length; i++) {
      const original = chars[i];
      for (let c = 97; c <= 122; c++) {
        chars[i] = String.fromCharCode(c);
        const cand = chars.join("");
        if (words.has(cand)) {
          words.delete(cand);
          queue.push([cand, steps + 1]);
        }
      }
      chars[i] = original;
    }
  }
  return 0;
}
