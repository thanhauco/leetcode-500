// LeetCode 547 — Number of Provinces (Medium)
// Category: Graphs · Approach: DFS components
// Time: O(n²) | Space: O(n)
// Source: https://leetcode.com/problems/number-of-provinces/

function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Array<boolean>(n).fill(false);
  const dfs = (city: number): void => {
    for (let other = 0; other < n; other++) {
      if (isConnected[city][other] === 1 && !visited[other]) {
        visited[other] = true;
        dfs(other);
      }
    }
  };
  let provinces = 0;
  for (let city = 0; city < n; city++) {
    if (!visited[city]) {
      visited[city] = true;
      dfs(city);
      provinces++;
    }
  }
  return provinces;
}
