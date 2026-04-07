# LeetCode 707 — Design Linked List (Medium)
# Category: Linked List · Approach: Singly linked nodes
# Time: O(1) ends, O(n) indexed | Space: O(n)
# Source: https://leetcode.com/problems/design-linked-list/

class Node:
    def __init__(self, val: int) -> None:
        self.val = val
        self.next: "Node | None" = None

class MyLinkedList:
    def __init__(self) -> None:
        self.head: Node | None = None
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        node = self.head
        for _ in range(index):
            node = node.next  # type: ignore[union-attr]
        return node.val  # type: ignore[union-attr]

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        node = Node(val)
        if index == 0:
            node.next = self.head
            self.head = node
        else:
            prev = self.head
            for _ in range(index - 1):
                prev = prev.next  # type: ignore[union-attr]
            node.next = prev.next  # type: ignore[union-attr]
            prev.next = node  # type: ignore[union-attr]
        self.size += 1

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        if index == 0:
            self.head = self.head.next  # type: ignore[union-attr]
        else:
            prev = self.head
            for _ in range(index - 1):
                prev = prev.next  # type: ignore[union-attr]
            prev.next = prev.next.next  # type: ignore[union-attr]
        self.size -= 1
