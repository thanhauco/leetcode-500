# LeetCode 1024 — Video Stitching (Medium)
# Category: Intervals · Approach: Interval DP
# Time: O(time · C) | Space: O(time)
# Source: https://leetcode.com/problems/video-stitching/

def video_stitching(clips: list[list[int]], time: int) -> int:
    INF = float("inf")
    dp = [INF] * (time + 1)
    dp[0] = 0
    for i in range(1, time + 1):
        for s, e in clips:
            if s < i <= e and dp[s] + 1 < dp[i]:
                dp[i] = dp[s] + 1
    return -1 if dp[time] == INF else dp[time]
