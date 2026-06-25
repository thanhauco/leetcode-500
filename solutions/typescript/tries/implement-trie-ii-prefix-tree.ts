// LeetCode 1804 — Implement Trie II (Prefix Tree) (Medium)
// Category: Tries · Approach: Counting trie
// Time: O(L) per op | Space: O(total chars)
// Source: https://leetcode.com/problems/implement-trie-ii-prefix-tree/

class TrieNode {
  ch: Record<string, TrieNode> = {};
  pre = 0;
  end = 0;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const c of word) { node = (node.ch[c] ??= new TrieNode()); node.pre++; }
    node.end++;
  }

  private find(s: string): TrieNode | null {
    let node = this.root;
    for (const c of s) { if (!node.ch[c]) return null; node = node.ch[c]; }
    return node;
  }

  countWordsEqualTo(word: string): number {
    const n = this.find(word);
    return n ? n.end : 0;
  }

  countWordsStartingWith(prefix: string): number {
    const n = this.find(prefix);
    return n ? n.pre : 0;
  }

  erase(word: string): void {
    let node = this.root;
    for (const c of word) {
      const child = node.ch[c];
      child.pre--;
      if (child.pre === 0) { delete node.ch[c]; return; }
      node = child;
    }
    node.end--;
  }
}
