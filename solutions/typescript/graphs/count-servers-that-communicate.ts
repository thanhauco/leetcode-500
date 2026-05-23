// LeetCode 1267 — Count Servers that Communicate (Medium)
// Category: Graphs · Approach: Row/Col Counts
// Time: O(m·n) | Space: O(m + n)
// Source: https://leetcode.com/problems/count-servers-that-communicate/

function countServers(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const rowCnt = new Array(rows).fill(0);
  const colCnt = new Array(cols).fill(0);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) { rowCnt[r]++; colCnt[c]++; }
  let ans = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1 && (rowCnt[r] > 1 || colCnt[c] > 1)) ans++;
  return ans;
}
