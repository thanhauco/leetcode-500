// LeetCode 729 — My Calendar I (Medium)
// Category: Intervals · Approach: Linear scan
// Time: O(n) per book | Space: O(n)
// Source: https://leetcode.com/problems/my-calendar-i/

class MyCalendar {
  private events: [number, number][] = [];

  book(start: number, end: number): boolean {
    for (const [s, e] of this.events) {
      if (start < e && s < end) return false;
    }
    this.events.push([start, end]);
    return true;
  }
}
