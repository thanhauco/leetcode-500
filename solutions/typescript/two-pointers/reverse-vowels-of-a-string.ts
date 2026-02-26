// LeetCode 345 — Reverse Vowels of a String (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/reverse-vowels-of-a-string/

function reverseVowels(s: string): string {
  const vowels = new Set("aeiouAEIOU");
  const arr = s.split("");
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (!vowels.has(arr[left])) left++;
    else if (!vowels.has(arr[right])) right--;
    else {
      const tmp = arr[left];
      arr[left] = arr[right];
      arr[right] = tmp;
      left++;
      right--;
    }
  }
  return arr.join("");
}
