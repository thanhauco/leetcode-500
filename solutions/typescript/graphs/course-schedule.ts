// LeetCode 207 — Course Schedule (Medium)
// Category: Graphs · Approach: Kahn Topological Sort
// Time: O(V + E) | Space: O(V + E)
// Source: https://leetcode.com/problems/course-schedule/

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const indeg = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  let seen = 0;
  while (queue.length) {
    const node = queue.shift()!;
    seen++;
    for (const nxt of adj[node]) if (--indeg[nxt] === 0) queue.push(nxt);
  }
  return seen === numCourses;
}
