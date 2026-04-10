# LeetCode 863 — All Nodes Distance K in Binary Tree (Medium)
# Category: Trees · Approach: Parent map + BFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/

from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def distance_k(root: TreeNode, target: int, k: int) -> list[int]:
    parent: dict[TreeNode, TreeNode | None] = {}
    target_node = None

    def dfs(node, par):
        nonlocal target_node
        if not node:
            return
        parent[node] = par
        if node.val == target:
            target_node = node
        dfs(node.left, node)
        dfs(node.right, node)

    dfs(root, None)
    if target_node is None:
        return []
    seen = {target_node}
    q = deque([target_node])
    dist = 0
    while q and dist < k:
        for _ in range(len(q)):
            node = q.popleft()
            for nb in (node.left, node.right, parent[node]):
                if nb and nb not in seen:
                    seen.add(nb)
                    q.append(nb)
        dist += 1
    return [node.val for node in q] if dist == k else []
