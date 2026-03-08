# LeetCode 735 — Asteroid Collision (Medium)
# Category: Stack · Approach: Stack
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/asteroid-collision/

def asteroid_collision(asteroids: list[int]) -> list[int]:
    stack: list[int] = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and stack and stack[-1] > 0:
            top = stack[-1]
            if top < -a:
                stack.pop()
            elif top == -a:
                stack.pop()
                alive = False
            else:
                alive = False
        if alive:
            stack.append(a)
    return stack
