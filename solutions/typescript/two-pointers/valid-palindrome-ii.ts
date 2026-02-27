// LeetCode 680 — Valid Palindrome II (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/valid-palindrome-ii/

function validPalindrome(s: string): boolean {
  const isPal = (l: number, r: number): boolean => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return isPal(left + 1, right) || isPal(left, right - 1);
    left++;
    right--;
  }
  return true;
}
