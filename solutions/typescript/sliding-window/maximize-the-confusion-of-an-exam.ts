// LeetCode 2024 — Maximize the Confusion of an Exam (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/

function maxConsecutiveAnswers(answerKey: string, k: number): number {
  const longest = (target: string): number => {
    let left = 0, count = 0, best = 0;
    for (let right = 0; right < answerKey.length; right++) {
      if (answerKey[right] === target) count++;
      while (count > k) {
        if (answerKey[left] === target) count--;
        left++;
      }
      best = Math.max(best, right - left + 1);
    }
    return best;
  };
  return Math.max(longest("T"), longest("F"));
}
