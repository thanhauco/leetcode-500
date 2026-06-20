// LeetCode 492 — Construct the Rectangle (Easy)
// Category: Math & Geometry · Approach: Search from sqrt
// Time: O(sqrt(area)) | Space: O(1)
// Source: https://leetcode.com/problems/construct-the-rectangle/

function constructRectangle(area: number): number[] {
  let w = Math.floor(Math.sqrt(area));
  while (area % w !== 0) w--;
  return [area / w, w];
}
