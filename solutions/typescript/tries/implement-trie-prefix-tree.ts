// LeetCode 208 — Implement Trie (Prefix Tree) (Medium)
// Category: Tries · Approach: Nested map
// Time: O(L) per op | Space: O(total chars)
// Source: https://leetcode.com/problems/implement-trie-prefix-tree/

class Trie {
  private root: Record<string, any> = {};

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) node = node[ch] ??= {};
    node.$ = true;
  }

  private find(s: string): Record<string, any> | null {
    let node = this.root;
    for (const ch of s) {
      if (!node[ch]) return null;
      node = node[ch];
    }
    return node;
  }

  search(word: string): boolean {
    const node = this.find(word);
    return !!(node && node.$);
  }

  startsWith(prefix: string): boolean {
    return this.find(prefix) !== null;
  }
}
