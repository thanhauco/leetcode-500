// LeetCode 1232 — Check If It Is a Straight Line (Easy)
// Category: Math & Geometry · Approach: Cross product
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/check-if-it-is-a-straight-line/

function checkStraightLine(coordinates: number[][]): boolean {
  const [x0, y0] = coordinates[0];
  const [x1, y1] = coordinates[1];
  const dx = x1 - x0, dy = y1 - y0;
  for (let i = 2; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (dx * (y - y0) !== dy * (x - x0)) return false;
  }
  return true;
}
