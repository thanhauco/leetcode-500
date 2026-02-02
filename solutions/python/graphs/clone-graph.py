# LeetCode 133 — Clone Graph (Medium)
# Category: Graphs · Approach: DFS clone
# Time: O(V + E) | Space: O(V)
# Source: https://leetcode.com/problems/clone-graph/

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: Node | None) -> Node | None:
    if node is None:
        return None
    clones: dict[Node, Node] = {}

    def dfs(cur: Node) -> Node:
        if cur in clones:
            return clones[cur]
        copy = Node(cur.val)
        clones[cur] = copy
        copy.neighbors = [dfs(nb) for nb in cur.neighbors]
        return copy

    return dfs(node)
