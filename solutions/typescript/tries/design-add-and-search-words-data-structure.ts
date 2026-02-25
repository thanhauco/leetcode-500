// LeetCode 211 — Design Add and Search Words Data Structure (Medium)
// Category: Tries · Approach: Trie + DFS
// Time: O(L) add, O(26^d·L) search | Space: O(total chars)
// Source: https://leetcode.com/problems/design-add-and-search-words-data-structure/

class WordDictionary {
  private root: Record<string, any> = {};

  addWord(word: string): void {
    let node = this.root;
    for (const ch of word) node = node[ch] ??= {};
    node.$ = true;
  }

  search(word: string): boolean {
    const dfs = (node: Record<string, any>, i: number): boolean => {
      if (i === word.length) return node.$ === true;
      const ch = word[i];
      if (ch === ".") {
        return Object.keys(node).some((k) => k !== "$" && dfs(node[k], i + 1));
      }
      return node[ch] !== undefined && dfs(node[ch], i + 1);
    };
    return dfs(this.root, 0);
  }
}
