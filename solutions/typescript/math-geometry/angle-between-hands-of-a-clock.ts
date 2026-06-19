// LeetCode 1344 — Angle Between Hands of a Clock (Medium)
// Category: Math & Geometry · Approach: Angle formula
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/angle-between-hands-of-a-clock/

function angleClock(hour: number, minutes: number): number {
  const minuteAngle = minutes * 6;
  const hourAngle = (hour % 12) * 30 + minutes * 0.5;
  const diff = Math.abs(hourAngle - minuteAngle);
  return Math.min(diff, 360 - diff);
}
