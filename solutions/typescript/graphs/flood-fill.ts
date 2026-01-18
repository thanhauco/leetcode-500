// LeetCode 733 — Flood Fill (Easy)
// Category: Graphs · Approach: DFS
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/flood-fill/

function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = image[sr][sc];
  if (start === color) return image;
  const rows = image.length, cols = image[0]?.length ?? 0;
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== start) return;
    image[r][c] = color;
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  };
  dfs(sr, sc);
  return image;
}
