// LeetCode 841 — Keys and Rooms (Medium)
// Category: Graphs · Approach: DFS
// Time: O(V + E) | Space: O(V)
// Source: https://leetcode.com/problems/keys-and-rooms/

function canVisitAllRooms(rooms: number[][]): boolean {
  const seen = new Set<number>([0]);
  const stack: number[] = [0];
  while (stack.length) {
    const room = stack.pop()!;
    for (const key of rooms[room]) {
      if (!seen.has(key)) {
        seen.add(key);
        stack.push(key);
      }
    }
  }
  return seen.size === rooms.length;
}
