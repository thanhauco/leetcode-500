// LeetCode 232 — Implement Queue using Stacks (Easy)
// Category: Stack · Approach: Two stacks
// Time: O(1) amortized per op | Space: O(n)
// Source: https://leetcode.com/problems/implement-queue-using-stacks/

class MyQueue {
  private inStk: number[] = [];
  private outStk: number[] = [];

  push(x: number): void {
    this.inStk.push(x);
  }

  private shift(): void {
    if (this.outStk.length === 0) {
      while (this.inStk.length) this.outStk.push(this.inStk.pop()!);
    }
  }

  pop(): number {
    this.shift();
    return this.outStk.pop()!;
  }

  peek(): number {
    this.shift();
    return this.outStk[this.outStk.length - 1];
  }

  empty(): boolean {
    return this.inStk.length === 0 && this.outStk.length === 0;
  }
}
