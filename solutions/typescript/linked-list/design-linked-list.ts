// LeetCode 707 — Design Linked List (Medium)
// Category: Linked List · Approach: Array-backed
// Time: O(1) ends, O(n) indexed | Space: O(n)
// Source: https://leetcode.com/problems/design-linked-list/

class MyLinkedList {
  private items: number[] = [];

  get(index: number): number {
    return index >= 0 && index < this.items.length ? this.items[index] : -1;
  }

  addAtHead(val: number): void {
    this.items.unshift(val);
  }

  addAtTail(val: number): void {
    this.items.push(val);
  }

  addAtIndex(index: number, val: number): void {
    if (index >= 0 && index <= this.items.length) this.items.splice(index, 0, val);
  }

  deleteAtIndex(index: number): void {
    if (index >= 0 && index < this.items.length) this.items.splice(index, 1);
  }
}
