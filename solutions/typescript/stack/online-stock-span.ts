// LeetCode 901 — Online Stock Span (Medium)
// Category: Stack · Approach: Monotonic stack
// Time: O(1) amortized per call | Space: O(n)
// Source: https://leetcode.com/problems/online-stock-span/

class StockSpanner {
  private stack: [number, number][] = []; // [price, span]

  next(price: number): number {
    let span = 1;
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()![1];
    }
    this.stack.push([price, span]);
    return span;
  }
}
