// LeetCode 676 — Implement Magic Dictionary (Medium)
// Category: Tries · Approach: Mismatch scan
// Time: O(n·L) per search | Space: O(n·L)
// Source: https://leetcode.com/problems/implement-magic-dictionary/

class MagicDictionary {
  private words: string[] = [];

  buildDict(dictionary: string[]): void {
    this.words = dictionary;
  }

  search(word: string): boolean {
    for (const d of this.words) {
      if (d.length !== word.length) continue;
      let diff = 0;
      for (let k = 0; k < word.length; k++) if (d[k] !== word[k]) diff++;
      if (diff === 1) return true;
    }
    return false;
  }
}
