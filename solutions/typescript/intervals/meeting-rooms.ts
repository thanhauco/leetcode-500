// LeetCode 252 — Meeting Rooms (Easy)
// Category: Intervals · Approach: Sort & Scan
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/meeting-rooms/

function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}
