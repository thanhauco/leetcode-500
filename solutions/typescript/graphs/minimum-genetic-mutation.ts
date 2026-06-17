// LeetCode 433 — Minimum Genetic Mutation (Medium)
// Category: Graphs · Approach: BFS
// Time: O(B · L · 4) | Space: O(B)
// Source: https://leetcode.com/problems/minimum-genetic-mutation/

function minMutation(start: string, end: string, bank: string[]): number {
  const valid = new Set(bank);
  if (!valid.has(end)) return -1;
  let queue: string[] = [start];
  const seen = new Set([start]);
  let steps = 0;
  while (queue.length) {
    const next: string[] = [];
    for (const gene of queue) {
      if (gene === end) return steps;
      for (let i = 0; i < gene.length; i++) {
        for (const ch of "ACGT") {
          if (ch === gene[i]) continue;
          const mut = gene.slice(0, i) + ch + gene.slice(i + 1);
          if (valid.has(mut) && !seen.has(mut)) {
            seen.add(mut);
            next.push(mut);
          }
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
}
