// LeetCode 155 — Min Stack (Medium)
// Category: Stack · Approach: Paired Min Stack
// Time: O(1) per op | Space: O(n)
// Source: https://leetcode.com/problems/min-stack/

class MinStack {
  private stack: number[] = [];
  private mins: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    this.mins.push(this.mins.length ? Math.min(val, this.mins[this.mins.length - 1]) : val);
  }

  pop(): void {
    this.stack.pop();
    this.mins.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.mins[this.mins.length - 1];
  }
}
