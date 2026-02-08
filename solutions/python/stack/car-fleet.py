# LeetCode 853 — Car Fleet (Medium)
# Category: Stack · Approach: Sort + sweep
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/car-fleet/

def car_fleet(target: int, position: list[int], speed: list[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    fleets = 0
    cur = 0.0
    for pos, spd in cars:
        t = (target - pos) / spd
        if t > cur:
            fleets += 1
            cur = t
    return fleets
