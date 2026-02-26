// LeetCode 648 — Replace Words (Medium)
// Category: Tries · Approach: Trie prefix
// Time: O(total chars) | Space: O(dictionary chars)
// Source: https://leetcode.com/problems/replace-words/

function replaceWords(dictionary: string[], sentence: string): string {
  const trie: Record<string, any> = {};
  for (const root of dictionary) {
    let node = trie;
    for (const ch of root) node = node[ch] ??= {};
    node.$ = true;
  }
  const shortestRoot = (word: string): string => {
    let node = trie;
    let prefix = "";
    for (const ch of word) {
      if (node[ch] === undefined) return word;
      prefix += ch;
      node = node[ch];
      if (node.$ === true) return prefix;
    }
    return word;
  };
  return sentence.split(" ").map(shortestRoot).join(" ");
}
