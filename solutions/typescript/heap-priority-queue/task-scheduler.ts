// LeetCode 621 — Task Scheduler (Medium)
// Category: Heap / Priority Queue · Approach: Greedy formula
// Time: O(t) | Space: O(1)
// Source: https://leetcode.com/problems/task-scheduler/

function leastInterval(tasks: string[], n: number): number {
  const counts = new Map<string, number>();
  for (const t of tasks) counts.set(t, (counts.get(t) ?? 0) + 1);
  let maxFreq = 0;
  for (const v of counts.values()) maxFreq = Math.max(maxFreq, v);
  let ties = 0;
  for (const v of counts.values()) if (v === maxFreq) ties++;
  const frame = (maxFreq - 1) * (n + 1) + ties;
  return Math.max(frame, tasks.length);
}
