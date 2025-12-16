// LeetCode 739 — Daily Temperatures (Medium)
// Category: Stack · Approach: Monotonic Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/daily-temperatures/

function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array<number>(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop()!;
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}
