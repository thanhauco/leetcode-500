// LeetCode 1845 — Seat Reservation Manager (Medium)
// Category: Heap / Priority Queue · Approach: Counter + Min-Heap
// Time: O(log n) per op | Space: O(n)
// Source: https://leetcode.com/problems/seat-reservation-manager/

class SeatManager {
  private next = 1;
  private heap: number[] = [];

  constructor(_n: number) {}

  private up(i: number): void {
    while (i > 0) { const p = (i - 1) >> 1; if (this.heap[i] < this.heap[p]) { [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]]; i = p; } else break; }
  }
  private down(i: number): void {
    for (;;) { let l = 2 * i + 1, r = 2 * i + 2, s = i;
      if (l < this.heap.length && this.heap[l] < this.heap[s]) s = l;
      if (r < this.heap.length && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break; [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]]; i = s; }
  }

  reserve(): number {
    if (this.heap.length) {
      const top = this.heap[0], last = this.heap.pop()!;
      if (this.heap.length) { this.heap[0] = last; this.down(0); }
      return top;
    }
    return this.next++;
  }

  unreserve(seatNumber: number): void {
    this.heap.push(seatNumber);
    this.up(this.heap.length - 1);
  }
}
