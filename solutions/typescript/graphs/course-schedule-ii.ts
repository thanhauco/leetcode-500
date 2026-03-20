// LeetCode 210 — Course Schedule II (Medium)
// Category: Graphs · Approach: Kahn's Algorithm
// Time: O(V + E) | Space: O(V + E)
// Source: https://leetcode.com/problems/course-schedule-ii/

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const indeg = new Array<number>(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) if (--indeg[v] === 0) queue.push(v);
  }
  return order.length === numCourses ? order : [];
}
