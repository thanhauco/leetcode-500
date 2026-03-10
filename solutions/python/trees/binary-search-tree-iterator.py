# LeetCode 173 — Binary Search Tree Iterator (Medium)
# Category: Trees · Approach: Flatten inorder
# Time: O(n) build, O(1) amortized per call | Space: O(n)
# Source: https://leetcode.com/problems/binary-search-tree-iterator/

class BSTIterator:
    def __init__(self, root):
        self.order: list[int] = []
        self.idx = 0
        def go(node):
            if not node:
                return
            go(node.left)
            self.order.append(node.val)
            go(node.right)
        go(root)

    def next(self) -> int:
        val = self.order[self.idx]
        self.idx += 1
        return val

    def hasNext(self) -> bool:
        return self.idx < len(self.order)
