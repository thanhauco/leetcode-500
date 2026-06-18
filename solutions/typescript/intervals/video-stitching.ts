// LeetCode 1024 — Video Stitching (Medium)
// Category: Intervals · Approach: Interval DP
// Time: O(time · C) | Space: O(time)
// Source: https://leetcode.com/problems/video-stitching/

function videoStitching(clips: number[][], time: number): number {
  const dp = new Array(time + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= time; i++) {
    for (const [s, e] of clips) {
      if (s < i && i <= e && dp[s] + 1 < dp[i]) dp[i] = dp[s] + 1;
    }
  }
  return dp[time] === Infinity ? -1 : dp[time];
}
