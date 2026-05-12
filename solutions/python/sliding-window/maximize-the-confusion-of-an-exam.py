# LeetCode 2024 — Maximize the Confusion of an Exam (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/maximize-the-confusion-of-an-exam/

def max_consecutive_answers(answer_key: str, k: int) -> int:
    def longest(target: str) -> int:
        left = count = best = 0
        for right, ch in enumerate(answer_key):
            if ch == target:
                count += 1
            while count > k:
                if answer_key[left] == target:
                    count -= 1
                left += 1
            best = max(best, right - left + 1)
        return best

    return max(longest("T"), longest("F"))
