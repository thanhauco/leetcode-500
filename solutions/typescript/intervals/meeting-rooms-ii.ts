// LeetCode 253 — Meeting Rooms II (Medium)
// Category: Intervals · Approach: Sweep Line
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/meeting-rooms-ii/

function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
  const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, e = 0;
  for (let i = 0; i < starts.length; i++) {
    while (e < ends.length && ends[e] <= starts[i]) {
      rooms--;
      e++;
    }
    rooms++;
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}
