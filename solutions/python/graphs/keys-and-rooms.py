# LeetCode 841 — Keys and Rooms (Medium)
# Category: Graphs · Approach: DFS
# Time: O(V + E) | Space: O(V)
# Source: https://leetcode.com/problems/keys-and-rooms/

def can_visit_all_rooms(rooms: list[list[int]]) -> bool:
    seen = {0}
    stack = [0]
    while stack:
        room = stack.pop()
        for key in rooms[room]:
            if key not in seen:
                seen.add(key)
                stack.append(key)
    return len(seen) == len(rooms)
