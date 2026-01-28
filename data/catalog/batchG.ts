import type { Problem } from "../types.ts";

/**
 * Batch G — twenty tree, trie, heap, and graph problems. Trees use LeetCode
 * level-order array I/O (null for missing children) and rebuild the tree inside
 * the runner; design/stream problems replay an ops/args list; graph grids are
 * cloned before mutation. Every record ships hand-verified runner tests.
 */
export const batchG: Problem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Trees
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 101,
    slug: "symmetric-tree",
    title: "Symmetric Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion", "BFS"],
    companies: ["amazon", "microsoft", "linkedin", "bloomberg"],
    frequency: 66,
    leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
    description:
      "Decide whether a binary tree is a mirror image of itself around its center. The playground encodes the tree as a level-order array with `null` for absent children and you return a boolean.",
    examples: [
      { input: "root = [1,2,2,3,4,4,3]", output: "true", explanation: "The left and right subtrees mirror each other." },
      { input: "root = [1,2,2,null,3,null,3]", output: "false" },
    ],
    intuition:
      "A tree is symmetric when its left and right subtrees mirror one another. Two subtrees mirror if their roots match and the outer pairs (left.left vs right.right) and inner pairs (left.right vs right.left) mirror as well. Recurse on those crossed pairs.",
    approach: [
      "An empty tree is symmetric.",
      "Define mirror(a, b): both null → true; one null → false; values differ → false.",
      "Otherwise recurse mirror(a.left, b.right) and mirror(a.right, b.left).",
      "Return mirror(root.left, root.right).",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Visit each node once; h = height recursion depth." },
    solutions: [
      {
        language: "python",
        label: "Recursive mirror",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def is_symmetric(root: TreeNode | None) -> bool:
    def mirror(a: TreeNode | None, b: TreeNode | None) -> bool:
        if not a and not b:
            return True
        if not a or not b or a.val != b.val:
            return False
        return mirror(a.left, b.right) and mirror(a.right, b.left)

    return mirror(root.left, root.right) if root else True`,
      },
      {
        language: "typescript",
        label: "Recursive mirror",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isSymmetric(root: TreeNode | null): boolean {
  const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return root ? mirror(root.left, root.right) : true;
}`,
      },
    ],
    runner: {
      entry: "isSymmetric",
      comparison: "deep",
      jsStarter: `function isSymmetric(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and check it mirrors itself.
}`,
      jsReference: `function isSymmetric(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const mirror = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  const root = build(level);
  return root ? mirror(root.left, root.right) : true;
}`,
    },
    tests: [
      { name: "symmetric", args: [[1, 2, 2, 3, 4, 4, 3]], expected: true },
      { name: "asymmetric", args: [[1, 2, 2, null, 3, null, 3]], expected: false },
      { name: "empty", args: [[]], expected: true },
      { name: "single", args: [[1]], expected: true },
    ],
    hints: ["Compare crossed pairs.", "Outer with outer, inner with inner."],
    relatedIds: [100, 226, 104],
  },
  {
    id: 111,
    slug: "minimum-depth-of-binary-tree",
    title: "Minimum Depth of Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "BFS", "Recursion"],
    companies: ["amazon", "microsoft", "apple", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
    description:
      "Return the number of nodes on the shortest path from the root down to the nearest leaf. The tree arrives as a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "2", explanation: "The leaf 9 sits at depth 2." },
      { input: "root = [2,null,3,null,4,null,5,null,6]", output: "5" },
    ],
    intuition:
      "Minimum depth is one plus the smaller child depth — but only among children that exist. A node with a single child is not a leaf, so you must descend the present side instead of treating the missing side as depth 0.",
    approach: [
      "If the node is null, return 0.",
      "If a child is missing, the answer is 1 + the depth of the other child.",
      "If both children exist, return 1 + min(left, right).",
      "A genuine leaf returns 1.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def min_depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    if not root.left:
        return 1 + min_depth(root.right)
    if not root.right:
        return 1 + min_depth(root.left)
    return 1 + min(min_depth(root.left), min_depth(root.right))`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}`,
      },
    ],
    runner: {
      entry: "minDepth",
      comparison: "deep",
      jsStarter: `function minDepth(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return its minimum depth.
}`,
      jsReference: `function minDepth(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const depth = (n) => {
    if (!n) return 0;
    if (!n.left) return 1 + depth(n.right);
    if (!n.right) return 1 + depth(n.left);
    return 1 + Math.min(depth(n.left), depth(n.right));
  };
  return depth(build(level));
}`,
    },
    tests: [
      { name: "shallow leaf", args: [[3, 9, 20, null, null, 15, 7]], expected: 2 },
      { name: "single chain", args: [[2, null, 3, null, 4, null, 5, null, 6]], expected: 5 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "one child", args: [[1, 2]], expected: 2 },
    ],
    hints: ["A node with one child is not a leaf.", "Take min only over existing children."],
    relatedIds: [104, 102, 559],
  },
  {
    id: 222,
    slug: "count-complete-tree-nodes",
    title: "Count Complete Tree Nodes",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion", "Binary Search"],
    companies: ["google", "amazon", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/count-complete-tree-nodes/",
    description:
      "Count how many nodes a binary tree contains. The tree is delivered as a level-order array with `null` for absent children and the answer is an integer.",
    examples: [
      { input: "root = [1,2,3,4,5,6]", output: "6" },
      { input: "root = []", output: "0" },
    ],
    intuition:
      "The simplest correct count visits every node and adds one per node. For a perfectly complete subtree the count can be derived from its height in O(log² n), but a plain traversal is clear and linear and suffices here.",
    approach: [
      "If the node is null, contribute 0.",
      "Otherwise contribute 1 plus the counts of both children.",
      "Sum across the whole tree.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Linear traversal; O(log² n) is possible exploiting completeness." },
    solutions: [
      {
        language: "python",
        label: "DFS count",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def count_nodes(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)`,
      },
      {
        language: "typescript",
        label: "DFS count",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function countNodes(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
      },
    ],
    runner: {
      entry: "countNodes",
      comparison: "deep",
      jsStarter: `function countNodes(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and count its nodes.
}`,
      jsReference: `function countNodes(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const count = (n) => (n ? 1 + count(n.left) + count(n.right) : 0);
  return count(build(level));
}`,
    },
    tests: [
      { name: "six nodes", args: [[1, 2, 3, 4, 5, 6]], expected: 6 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "trailing null", args: [[1, 2, 3, 4, 5, 6, null]], expected: 6 },
    ],
    hints: ["Every node adds one.", "Completeness lets you skip whole perfect subtrees."],
    relatedIds: [104, 110, 222],
  },
  {
    id: 257,
    slug: "binary-tree-paths",
    title: "Binary Tree Paths",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Backtracking", "Recursion"],
    companies: ["google", "apple", "amazon", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-paths/",
    description:
      "List every root-to-leaf path as a string of node values joined by `->`. The tree is a level-order array with `null` for missing children; paths may be returned in any order.",
    examples: [
      { input: "root = [1,2,3,null,5]", output: '["1->2->5","1->3"]' },
      { input: "root = [1]", output: '["1"]' },
    ],
    intuition:
      "Walk down the tree carrying the values seen so far. When you reach a leaf, the accumulated trail is one complete path. Backtracking naturally explores every branch.",
    approach: [
      "Start a DFS with an empty trail of values.",
      "Append the current node's value to the trail.",
      "At a leaf, join the trail with `->` and record it.",
      "Otherwise recurse into any existing children.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Output can be O(n·h) characters total." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def binary_tree_paths(root: TreeNode | None) -> list[str]:
    paths: list[str] = []

    def dfs(node: TreeNode | None, trail: list[str]) -> None:
        if not node:
            return
        trail.append(str(node.val))
        if not node.left and not node.right:
            paths.append("->".join(trail))
        else:
            dfs(node.left, trail)
            dfs(node.right, trail)
        trail.pop()

    dfs(root, [])
    return paths`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function binaryTreePaths(root: TreeNode | null): string[] {
  const paths: string[] = [];
  const dfs = (node: TreeNode | null, trail: number[]): void => {
    if (!node) return;
    trail.push(node.val);
    if (!node.left && !node.right) paths.push(trail.join("->"));
    else {
      dfs(node.left, trail);
      dfs(node.right, trail);
    }
    trail.pop();
  };
  dfs(root, []);
  return paths;
}`,
      },
    ],
    runner: {
      entry: "binaryTreePaths",
      comparison: "canonical",
      jsStarter: `function binaryTreePaths(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return every root-to-leaf path as a "a->b->c" string.
}`,
      jsReference: `function binaryTreePaths(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const paths = [];
  const dfs = (node, trail) => {
    if (!node) return;
    trail.push(node.val);
    if (!node.left && !node.right) paths.push(trail.join("->"));
    else { dfs(node.left, trail); dfs(node.right, trail); }
    trail.pop();
  };
  dfs(build(level), []);
  return paths;
}`,
    },
    tests: [
      { name: "two paths", args: [[1, 2, 3, null, 5]], expected: ["1->2->5", "1->3"] },
      { name: "single", args: [[1]], expected: ["1"] },
      { name: "balanced", args: [[1, 2, 3, 4, null, null, 5]], expected: ["1->2->4", "1->3->5"] },
    ],
    hints: ["Carry the trail down the recursion.", "Record at leaves only."],
    relatedIds: [112, 113, 988],
  },
  {
    id: 404,
    slug: "sum-of-left-leaves",
    title: "Sum of Left Leaves",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "adobe", "meta"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/sum-of-left-leaves/",
    description:
      "Add up the values of every leaf that is the left child of its parent. The tree is provided as a level-order array with `null` for missing children and the answer is an integer.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "24", explanation: "Left leaves are 9 and 15." },
      { input: "root = [1]", output: "0" },
    ],
    intuition:
      "A left leaf is a node that is simultaneously a leaf and the left child of someone. Carry a flag down the recursion marking whether the current node hangs off the left of its parent; add its value only when it is a flagged leaf.",
    approach: [
      "DFS each node, remembering whether it is a left child.",
      "If the node is a leaf and was reached as a left child, add its value.",
      "Recurse left with the flag set true, right with the flag set false.",
      "Return the accumulated sum.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "h = tree height." },
    solutions: [
      {
        language: "python",
        label: "DFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def sum_of_left_leaves(root: TreeNode | None) -> int:
    def dfs(node: TreeNode | None, is_left: bool) -> int:
        if not node:
            return 0
        if not node.left and not node.right:
            return node.val if is_left else 0
        return dfs(node.left, True) + dfs(node.right, False)

    return dfs(root, False)`,
      },
      {
        language: "typescript",
        label: "DFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function sumOfLeftLeaves(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null, isLeft: boolean): number => {
    if (!node) return 0;
    if (!node.left && !node.right) return isLeft ? node.val : 0;
    return dfs(node.left, true) + dfs(node.right, false);
  };
  return dfs(root, false);
}`,
      },
    ],
    runner: {
      entry: "sumOfLeftLeaves",
      comparison: "deep",
      jsStarter: `function sumOfLeftLeaves(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and sum the values of left-child leaves.
}`,
      jsReference: `function sumOfLeftLeaves(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const dfs = (node, isLeft) => {
    if (!node) return 0;
    if (!node.left && !node.right) return isLeft ? node.val : 0;
    return dfs(node.left, true) + dfs(node.right, false);
  };
  return dfs(build(level), false);
}`,
    },
    tests: [
      { name: "two left leaves", args: [[3, 9, 20, null, null, 15, 7]], expected: 24 },
      { name: "root only", args: [[1]], expected: 0 },
      { name: "empty", args: [[]], expected: 0 },
      { name: "deep left", args: [[1, 2, 3, 4, 5]], expected: 4 },
    ],
    hints: ["Pass down whether you are a left child.", "Only leaves contribute."],
    relatedIds: [112, 257, 129],
  },
  {
    id: 113,
    slug: "path-sum-ii",
    title: "Path Sum II",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Backtracking"],
    companies: ["amazon", "microsoft", "meta"],
    frequency: 64,
    leetcodeUrl: "https://leetcode.com/problems/path-sum-ii/",
    description:
      "Find every root-to-leaf path whose node values add up to a target sum, returning each as a list of values. The tree is a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], target = 22", output: "[[5,4,11,2],[5,8,4,5]]" },
      { input: "root = [1,2,3], target = 5", output: "[]" },
    ],
    intuition:
      "Carry the running total and the trail of values down each branch. At a leaf, check whether the total hits the target and, if so, snapshot the trail. Backtracking restores the trail as the recursion unwinds.",
    approach: [
      "DFS with the remaining target and the current value trail.",
      "Subtract the node's value from the remaining target.",
      "At a leaf, if the remaining target is zero, record a copy of the trail.",
      "Recurse into existing children, then pop the value on the way out.",
    ],
    complexity: { time: "O(n²)", space: "O(h)", note: "Copying each qualifying path costs up to O(h)." },
    solutions: [
      {
        language: "python",
        label: "DFS backtracking",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def path_sum(root: TreeNode | None, target: int) -> list[list[int]]:
    result: list[list[int]] = []

    def dfs(node: TreeNode | None, remaining: int, trail: list[int]) -> None:
        if not node:
            return
        trail.append(node.val)
        remaining -= node.val
        if not node.left and not node.right and remaining == 0:
            result.append(trail.copy())
        else:
            dfs(node.left, remaining, trail)
            dfs(node.right, remaining, trail)
        trail.pop()

    dfs(root, target, [])
    return result`,
      },
      {
        language: "typescript",
        label: "DFS backtracking",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pathSum(root: TreeNode | null, target: number): number[][] {
  const result: number[][] = [];
  const dfs = (node: TreeNode | null, remaining: number, trail: number[]): void => {
    if (!node) return;
    trail.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) result.push([...trail]);
    else {
      dfs(node.left, remaining, trail);
      dfs(node.right, remaining, trail);
    }
    trail.pop();
  };
  dfs(root, target, []);
  return result;
}`,
      },
    ],
    runner: {
      entry: "pathSum",
      comparison: "canonical",
      jsStarter: `function pathSum(level, target) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return every root-to-leaf path summing to target.
}`,
      jsReference: `function pathSum(level, target) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const result = [];
  const dfs = (node, remaining, trail) => {
    if (!node) return;
    trail.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) result.push([...trail]);
    else { dfs(node.left, remaining, trail); dfs(node.right, remaining, trail); }
    trail.pop();
  };
  dfs(build(level), target, []);
  return result;
}`,
    },
    tests: [
      {
        name: "two paths",
        args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22],
        expected: [[5, 4, 11, 2], [5, 8, 4, 5]],
      },
      { name: "none", args: [[1, 2, 3], 5], expected: [] },
      { name: "non-leaf reject", args: [[1, 2], 1], expected: [] },
      { name: "negatives", args: [[-2, null, -3], -5], expected: [[-2, -3]] },
    ],
    hints: ["Subtract as you descend.", "Snapshot the trail only at qualifying leaves."],
    relatedIds: [112, 437, 257],
  },
  {
    id: 199,
    slug: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "DFS"],
    companies: ["meta", "amazon", "google", "microsoft", "bloomberg"],
    frequency: 74,
    leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
    description:
      "Standing to the right of the tree, report the value of the last node visible at each depth, top to bottom. The tree is a level-order array with `null` for missing children.",
    examples: [
      { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
      { input: "root = [1,null,3]", output: "[1,3]" },
    ],
    intuition:
      "The rightmost node on each level is exactly what an observer on the right would see. A level-order traversal lets you grab the final node processed at every depth.",
    approach: [
      "Run a BFS level by level from the root.",
      "For each level, iterate its nodes left to right.",
      "Record the value of the last node in that level.",
      "Collect those values top to bottom.",
    ],
    complexity: { time: "O(n)", space: "O(w)", note: "w = maximum level width." },
    solutions: [
      {
        language: "python",
        label: "BFS",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def right_side_view(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    view: list[int] = []
    queue = deque([root])
    while queue:
        size = len(queue)
        for i in range(size):
            node = queue.popleft()
            if i == size - 1:
                view.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return view`,
      },
      {
        language: "typescript",
        label: "BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const view: number[] = [];
  let level: TreeNode[] = [root];
  while (level.length) {
    view.push(level[level.length - 1].val);
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return view;
}`,
      },
    ],
    runner: {
      entry: "rightSideView",
      comparison: "deep",
      jsStarter: `function rightSideView(level) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and return the rightmost value at each depth.
}`,
      jsReference: `function rightSideView(level) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const root = build(level);
  if (!root) return [];
  const view = [];
  let lvl = [root];
  while (lvl.length) {
    view.push(lvl[lvl.length - 1].val);
    const next = [];
    for (const node of lvl) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    lvl = next;
  }
  return view;
}`,
    },
    tests: [
      { name: "classic", args: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
      { name: "right chain", args: [[1, null, 3]], expected: [1, 3] },
      { name: "empty", args: [[]], expected: [] },
      { name: "deepest from left", args: [[1, 2, 3, 4]], expected: [1, 3, 4] },
    ],
    hints: ["Last node per level.", "Level-order makes this trivial."],
    relatedIds: [102, 116, 515],
  },
  {
    id: 105,
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Divide and Conquer", "Recursion", "Hash Map"],
    companies: ["amazon", "microsoft", "google", "bloomberg", "apple"],
    frequency: 70,
    leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    description:
      "Rebuild a binary tree given its preorder and inorder traversals (values are unique). The runner takes the two arrays and returns the tree serialized as a level-order array.",
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]",
      },
      { input: "preorder = [-1], inorder = [-1]", output: "[-1]" },
    ],
    intuition:
      "Preorder hands you the root first; locating that root inside inorder splits the remaining values into the left subtree (before it) and right subtree (after it). Recurse on each side, consuming preorder left to right.",
    approach: [
      "Index each value's position in inorder for O(1) lookups.",
      "Take the next preorder value as the current root.",
      "Find it in inorder to size the left and right inorder ranges.",
      "Recurse to build the left subtree, then the right, then return the root.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Hash map of inorder indices plus recursion." },
    solutions: [
      {
        language: "python",
        label: "Divide and conquer",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode | None:
    index = {v: i for i, v in enumerate(inorder)}
    pre = 0

    def rec(lo: int, hi: int) -> TreeNode | None:
        nonlocal pre
        if lo > hi:
            return None
        val = preorder[pre]
        pre += 1
        node = TreeNode(val)
        mid = index[val]
        node.left = rec(lo, mid - 1)
        node.right = rec(mid + 1, hi)
        return node

    return rec(0, len(inorder) - 1)`,
      },
      {
        language: "typescript",
        label: "Divide and conquer",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const index = new Map<number, number>();
  inorder.forEach((v, i) => index.set(v, i));
  let pre = 0;
  const rec = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const val = preorder[pre++];
    const node = new TreeNode(val);
    const mid = index.get(val)!;
    node.left = rec(lo, mid - 1);
    node.right = rec(mid + 1, hi);
    return node;
  };
  return rec(0, inorder.length - 1);
}`,
      },
    ],
    runner: {
      entry: "buildTree",
      comparison: "deep",
      jsStarter: `function buildTree(preorder, inorder) {
  // Rebuild the tree from its traversals and return it as a level-order array.
  // TODO: implement
}`,
      jsReference: `function buildTree(preorder, inorder) {
  const index = new Map();
  inorder.forEach((v, i) => index.set(v, i));
  let pre = 0;
  const rec = (lo, hi) => {
    if (lo > hi) return null;
    const val = preorder[pre++];
    const node = { val, left: null, right: null };
    const mid = index.get(val);
    node.left = rec(lo, mid - 1);
    node.right = rec(mid + 1, hi);
    return node;
  };
  const root = rec(0, inorder.length - 1);
  // Serialize to a LeetCode level-order array, trimming trailing nulls.
  if (!root) return [];
  const out = [];
  const q = [root];
  while (q.length) {
    const n = q.shift();
    if (n) { out.push(n.val); q.push(n.left); q.push(n.right); }
    else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}`,
    },
    tests: [
      { name: "classic", args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expected: [3, 9, 20, null, null, 15, 7] },
      { name: "single", args: [[-1], [-1]], expected: [-1] },
      { name: "left lean", args: [[1, 2], [2, 1]], expected: [1, 2] },
    ],
    hints: ["Preorder gives roots in order.", "Inorder splits left vs right."],
    relatedIds: [106, 889, 1008],
  },
  {
    id: 106,
    slug: "construct-binary-tree-from-inorder-and-postorder-traversal",
    title: "Construct Binary Tree from Inorder and Postorder Traversal",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Divide and Conquer", "Recursion", "Hash Map"],
    companies: ["amazon", "microsoft", "google", "bloomberg"],
    frequency: 62,
    leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    description:
      "Rebuild a binary tree from its inorder and postorder traversals (values are unique). The runner takes the two arrays and returns the tree serialized as a level-order array.",
    examples: [
      {
        input: "inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]",
        output: "[3,9,20,null,null,15,7]",
      },
      { input: "inorder = [-1], postorder = [-1]", output: "[-1]" },
    ],
    intuition:
      "Postorder ends with the root; finding it in inorder splits the values into left and right subtrees. Because postorder lists left then right then root, consuming it from the back builds the right subtree before the left.",
    approach: [
      "Index each value's position in inorder.",
      "Take the last unused postorder value as the current root.",
      "Split inorder around it into left and right ranges.",
      "Recurse to build the right subtree first, then the left, then return the root.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Index map plus recursion stack." },
    solutions: [
      {
        language: "python",
        label: "Divide and conquer",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build_tree(inorder: list[int], postorder: list[int]) -> TreeNode | None:
    index = {v: i for i, v in enumerate(inorder)}
    post = len(postorder) - 1

    def rec(lo: int, hi: int) -> TreeNode | None:
        nonlocal post
        if lo > hi:
            return None
        val = postorder[post]
        post -= 1
        node = TreeNode(val)
        mid = index[val]
        node.right = rec(mid + 1, hi)
        node.left = rec(lo, mid - 1)
        return node

    return rec(0, len(inorder) - 1)`,
      },
      {
        language: "typescript",
        label: "Divide and conquer",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const index = new Map<number, number>();
  inorder.forEach((v, i) => index.set(v, i));
  let post = postorder.length - 1;
  const rec = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const val = postorder[post--];
    const node = new TreeNode(val);
    const mid = index.get(val)!;
    node.right = rec(mid + 1, hi);
    node.left = rec(lo, mid - 1);
    return node;
  };
  return rec(0, inorder.length - 1);
}`,
      },
    ],
    runner: {
      entry: "buildTree",
      comparison: "deep",
      jsStarter: `function buildTree(inorder, postorder) {
  // Rebuild the tree from its traversals and return it as a level-order array.
  // TODO: implement
}`,
      jsReference: `function buildTree(inorder, postorder) {
  const index = new Map();
  inorder.forEach((v, i) => index.set(v, i));
  let post = postorder.length - 1;
  const rec = (lo, hi) => {
    if (lo > hi) return null;
    const val = postorder[post--];
    const node = { val, left: null, right: null };
    const mid = index.get(val);
    node.right = rec(mid + 1, hi);
    node.left = rec(lo, mid - 1);
    return node;
  };
  const root = rec(0, inorder.length - 1);
  if (!root) return [];
  const out = [];
  const q = [root];
  while (q.length) {
    const n = q.shift();
    if (n) { out.push(n.val); q.push(n.left); q.push(n.right); }
    else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}`,
    },
    tests: [
      { name: "classic", args: [[9, 3, 15, 20, 7], [9, 15, 7, 20, 3]], expected: [3, 9, 20, null, null, 15, 7] },
      { name: "single", args: [[-1], [-1]], expected: [-1] },
      { name: "left lean", args: [[2, 1], [2, 1]], expected: [1, 2] },
    ],
    hints: ["Postorder's last element is the root.", "Consume postorder from the back, right subtree first."],
    relatedIds: [105, 889, 1008],
  },
  {
    id: 437,
    slug: "path-sum-iii",
    title: "Path Sum III",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Prefix Sum", "Hash Map"],
    companies: ["amazon", "google", "microsoft", "meta"],
    frequency: 68,
    leetcodeUrl: "https://leetcode.com/problems/path-sum-iii/",
    description:
      "Count the downward paths (any node to any descendant) whose values sum to a target. The tree is a level-order array with `null` for missing children and the answer is an integer.",
    examples: [
      { input: "root = [10,5,-3,3,2,null,11,3,-2,null,1], target = 8", output: "3" },
      { input: "root = [1,2,3], target = 3", output: "2" },
    ],
    intuition:
      "Track the running prefix sum from the root to the current node. A downward path ending here sums to the target exactly when some earlier prefix equals current − target, so a hash map of prefix-sum counts answers each node in O(1). Decrement on the way back up.",
    approach: [
      "DFS carrying the running prefix sum from the root.",
      "Add count[prefix − target] to the answer (a map seeded with {0: 1}).",
      "Record the current prefix in the map before recursing.",
      "Remove it after recursing to avoid leaking across siblings.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One prefix-sum map shared along the DFS." },
    solutions: [
      {
        language: "python",
        label: "Prefix sum",
        code: `from collections import defaultdict

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def path_sum(root: TreeNode | None, target: int) -> int:
    counts: dict[int, int] = defaultdict(int)
    counts[0] = 1

    def dfs(node: TreeNode | None, prefix: int) -> int:
        if not node:
            return 0
        prefix += node.val
        total = counts[prefix - target]
        counts[prefix] += 1
        total += dfs(node.left, prefix) + dfs(node.right, prefix)
        counts[prefix] -= 1
        return total

    return dfs(root, 0)`,
      },
      {
        language: "typescript",
        label: "Prefix sum",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pathSum(root: TreeNode | null, target: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  const dfs = (node: TreeNode | null, prefix: number): number => {
    if (!node) return 0;
    prefix += node.val;
    let total = counts.get(prefix - target) ?? 0;
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    total += dfs(node.left, prefix) + dfs(node.right, prefix);
    counts.set(prefix, counts.get(prefix)! - 1);
    return total;
  };
  return dfs(root, 0);
}`,
      },
    ],
    runner: {
      entry: "pathSum",
      comparison: "deep",
      jsStarter: `function pathSum(level, target) {
  // 'level' is the tree as a LeetCode level-order array (null = missing child).
  // TODO: build the tree and count downward paths summing to target.
}`,
      jsReference: `function pathSum(level, target) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
      const node = q.shift();
      if (i < arr.length) { const lv = arr[i++]; if (lv !== null) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } }
      if (i < arr.length) { const rv = arr[i++]; if (rv !== null) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } }
    }
    return root;
  }
  const counts = new Map([[0, 1]]);
  const dfs = (node, prefix) => {
    if (!node) return 0;
    prefix += node.val;
    let total = counts.get(prefix - target) ?? 0;
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    total += dfs(node.left, prefix) + dfs(node.right, prefix);
    counts.set(prefix, counts.get(prefix) - 1);
    return total;
  };
  return dfs(build(level), 0);
}`,
    },
    tests: [
      { name: "three paths", args: [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8], expected: 3 },
      { name: "two short paths", args: [[1, 2, 3], 3], expected: 2 },
      { name: "empty", args: [[], 5], expected: 0 },
      { name: "zeros", args: [[0, 1, 1], 1], expected: 4 },
    ],
    hints: ["Prefix sums turn this into Two Sum.", "Backtrack the map count after each node."],
    relatedIds: [112, 113, 560],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Tries
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 211,
    slug: "design-add-and-search-words-data-structure",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Design", "DFS"],
    companies: ["meta", "amazon", "google", "microsoft", "bloomberg"],
    frequency: 71,
    leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    description:
      "Design a dictionary that supports adding words and searching where `.` matches any single letter. The playground replays an ops/args list and returns the results array (`null` for void operations).",
    examples: [
      {
        input:
          'ops = ["WordDictionary","addWord","addWord","addWord","search","search","search","search"], args = [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: "[null,null,null,null,false,true,true,true]",
      },
    ],
    intuition:
      "Store words in a trie keyed by character. Plain lookups walk a single path; a `.` forces a branch where you must try every child at that depth. A short DFS handles the wildcard backtracking.",
    approach: [
      "addWord: walk/create trie nodes per character, mark the last node as a word end.",
      "search: DFS from the root over the query characters.",
      "On a normal character, descend into that one child if present.",
      "On `.`, recurse into every child; succeed if any branch reaches a word end.",
    ],
    complexity: { time: "O(L) add, O(26^d·L) search", space: "O(total chars)", note: "d = number of dots in a query." },
    solutions: [
      {
        language: "python",
        label: "Trie + DFS",
        code: `class WordDictionary:
    def __init__(self):
        self.root: dict = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["$"] = True

    def search(self, word: str) -> bool:
        def dfs(node: dict, i: int) -> bool:
            if i == len(word):
                return "$" in node
            ch = word[i]
            if ch == ".":
                return any(dfs(child, i + 1) for key, child in node.items() if key != "$")
            return ch in node and dfs(node[ch], i + 1)

        return dfs(self.root, 0)`,
      },
      {
        language: "typescript",
        label: "Trie + DFS",
        code: `class WordDictionary {
  private root: Record<string, any> = {};

  addWord(word: string): void {
    let node = this.root;
    for (const ch of word) node = node[ch] ??= {};
    node.$ = true;
  }

  search(word: string): boolean {
    const dfs = (node: Record<string, any>, i: number): boolean => {
      if (i === word.length) return node.$ === true;
      const ch = word[i];
      if (ch === ".") {
        return Object.keys(node).some((k) => k !== "$" && dfs(node[k], i + 1));
      }
      return node[ch] !== undefined && dfs(node[ch], i + 1);
    };
    return dfs(this.root, 0);
  }
}`,
      },
    ],
    runner: {
      entry: "runWordDictionary",
      comparison: "deep",
      jsStarter: `function runWordDictionary(ops, args) {
  // Replay the operations; addWord returns null, search returns a boolean.
  // TODO: implement the trie with '.' wildcard search.
}`,
      jsReference: `function runWordDictionary(ops, args) {
  class WordDictionary {
    constructor() { this.root = {}; }
    addWord(w) { let n = this.root; for (const c of w) n = (n[c] ??= {}); n.$ = true; }
    search(w) {
      const dfs = (node, i) => {
        if (i === w.length) return node.$ === true;
        const c = w[i];
        if (c === ".") return Object.keys(node).some((k) => k !== "$" && dfs(node[k], i + 1));
        return node[c] !== undefined && dfs(node[c], i + 1);
      };
      return dfs(this.root, 0);
    }
  }
  const out = [];
  let dict = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "WordDictionary") { dict = new WordDictionary(); out.push(null); }
    else if (op === "addWord") { dict.addWord(a[0]); out.push(null); }
    else if (op === "search") out.push(dict.search(a[0]));
  }
  return out;
}`,
    },
    tests: [
      {
        name: "wildcards",
        args: [
          ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"],
          [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
        ],
        expected: [null, null, null, null, false, true, true, true],
      },
      {
        name: "single dot",
        args: [
          ["WordDictionary", "addWord", "search", "search"],
          [[], ["a"], ["a"], ["."]],
        ],
        expected: [null, null, true, true],
      },
      {
        name: "miss",
        args: [
          ["WordDictionary", "search"],
          [[], ["x"]],
        ],
        expected: [null, false],
      },
    ],
    hints: ["A dot branches into every child.", "Backtracking DFS over the trie."],
    relatedIds: [208, 212, 79],
  },
  {
    id: 212,
    slug: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "tries",
    patterns: ["Trie", "Backtracking", "DFS"],
    companies: ["amazon", "microsoft", "google", "meta", "uber"],
    frequency: 69,
    leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
    description:
      "Given a grid of letters and a word list, return every word that can be spelled by walking to adjacent cells without reusing a cell in the same word. The runner takes the board and words and returns the found words (any order).",
    examples: [
      {
        input:
          'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
    ],
    intuition:
      "Searching each word independently rescans the board many times. Instead, load all words into a trie and run one DFS from every cell, following trie edges. The board is explored once and shared prefixes are pruned automatically.",
    approach: [
      "Insert every word into a trie, storing the full word at terminal nodes.",
      "From each cell, DFS into the matching trie child if it exists.",
      "On reaching a terminal node, record the word and clear it to avoid duplicates.",
      "Mark cells visited during the path and restore them on backtrack.",
    ],
    complexity: { time: "O(m·n·4^L)", space: "O(total chars)", note: "L = longest word; trie bounds the branching." },
    solutions: [
      {
        language: "python",
        label: "Trie + backtracking",
        code: `def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    trie: dict = {}
    for w in words:
        node = trie
        for ch in w:
            node = node.setdefault(ch, {})
        node["$"] = w

    rows, cols = len(board), len(board[0])
    found: list[str] = []

    def dfs(r: int, c: int, node: dict) -> None:
        ch = board[r][c]
        if ch not in node:
            return
        nxt = node[ch]
        word = nxt.pop("$", None)
        if word is not None:
            found.append(word)
        board[r][c] = "#"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                dfs(nr, nc, nxt)
        board[r][c] = ch

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie)
    return found`,
      },
      {
        language: "typescript",
        label: "Trie + backtracking",
        code: `function findWords(board: string[][], words: string[]): string[] {
  const trie: Record<string, any> = {};
  for (const w of words) {
    let node = trie;
    for (const ch of w) node = node[ch] ??= {};
    node.$ = w;
  }
  const rows = board.length, cols = board[0].length;
  const found: string[] = [];
  const dfs = (r: number, c: number, node: Record<string, any>): void => {
    const ch = board[r][c];
    const next = node[ch];
    if (next === undefined) return;
    if (typeof next.$ === "string") {
      found.push(next.$);
      delete next.$;
    }
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== "#") dfs(nr, nc, next);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, trie);
  return found;
}`,
      },
    ],
    runner: {
      entry: "findWords",
      comparison: "canonical",
      jsStarter: `function findWords(board, words) {
  // Return the words from the list that can be spelled on the board.
  // TODO: build a trie and DFS once from each cell.
}`,
      jsReference: `function findWords(input, words) {
  // Clone the board so repeated runs start fresh.
  const board = input.map((row) => row.slice());
  const trie = {};
  for (const w of words) {
    let node = trie;
    for (const ch of w) node = (node[ch] ??= {});
    node.$ = w;
  }
  const rows = board.length, cols = board[0] ? board[0].length : 0;
  const found = [];
  const dfs = (r, c, node) => {
    const ch = board[r][c];
    const next = node[ch];
    if (next === undefined) return;
    if (typeof next.$ === "string") { found.push(next.$); delete next.$; }
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== "#") dfs(nr, nc, next);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, trie);
  return found;
}`,
    },
    tests: [
      {
        name: "two found",
        args: [
          [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]],
          ["oath", "pea", "eat", "rain"],
        ],
        expected: ["oath", "eat"],
      },
      {
        name: "no reuse",
        args: [[["a", "b"], ["c", "d"]], ["abcb"]],
        expected: [],
      },
      {
        name: "single cell",
        args: [[["a"]], ["a"]],
        expected: ["a"],
      },
    ],
    hints: ["One trie, one board sweep.", "Strip terminal markers to dedupe."],
    relatedIds: [208, 79, 211],
  },
  {
    id: 648,
    slug: "replace-words",
    title: "Replace Words",
    difficulty: "Medium",
    category: "tries",
    patterns: ["Trie", "Hash Map", "String"],
    companies: ["amazon", "google", "microsoft", "adobe"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/replace-words/",
    description:
      "Given a dictionary of root words and a sentence, replace each word with the shortest dictionary root that is a prefix of it; words without a matching root stay unchanged. The runner takes the dictionary and sentence and returns the rewritten sentence.",
    examples: [
      {
        input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"',
        output: '"the cat was rat by the bat"',
      },
    ],
    intuition:
      "Insert every root into a trie. For each word, walk its characters through the trie and stop at the first node marked as a root — that is the shortest applicable prefix. If you fall off the trie without hitting a root, keep the word.",
    approach: [
      "Build a trie of all root words, flagging terminal nodes.",
      "Split the sentence into words.",
      "For each word, descend the trie until a root flag or a dead end.",
      "Emit the shortest root if found, else the original word; join with spaces.",
    ],
    complexity: { time: "O(total chars)", space: "O(dictionary chars)", note: "Each character visited once." },
    solutions: [
      {
        language: "python",
        label: "Trie prefix",
        code: `def replace_words(dictionary: list[str], sentence: str) -> str:
    trie: dict = {}
    for root in dictionary:
        node = trie
        for ch in root:
            node = node.setdefault(ch, {})
        node["$"] = True

    def shortest_root(word: str) -> str:
        node = trie
        prefix: list[str] = []
        for ch in word:
            if ch not in node:
                return word
            prefix.append(ch)
            node = node[ch]
            if "$" in node:
                return "".join(prefix)
        return word

    return " ".join(shortest_root(w) for w in sentence.split())`,
      },
      {
        language: "typescript",
        label: "Trie prefix",
        code: `function replaceWords(dictionary: string[], sentence: string): string {
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
}`,
      },
    ],
    runner: {
      entry: "replaceWords",
      comparison: "deep",
      jsStarter: `function replaceWords(dictionary, sentence) {
  // Replace each word with its shortest dictionary root prefix.
  // TODO: implement
}`,
      jsReference: `function replaceWords(dictionary, sentence) {
  const trie = {};
  for (const root of dictionary) {
    let node = trie;
    for (const ch of root) node = (node[ch] ??= {});
    node.$ = true;
  }
  const shortestRoot = (word) => {
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
}`,
    },
    tests: [
      {
        name: "three roots",
        args: [["cat", "bat", "rat"], "the cattle was rattled by the battery"],
        expected: "the cat was rat by the bat",
      },
      {
        name: "single-letter roots",
        args: [["a", "b", "c"], "aadsfasf absbs bbab cadsfafs"],
        expected: "a a b c",
      },
      {
        name: "shortest wins",
        args: [["catt", "cat", "bat", "rat"], "the cattle was rattled by the battery"],
        expected: "the cat was rat by the bat",
      },
    ],
    hints: ["Stop at the first root flag.", "No match means keep the word."],
    relatedIds: [208, 211, 720],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Heap / Priority Queue
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 295,
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "heap-priority-queue",
    patterns: ["Heap", "Two Heaps", "Design"],
    companies: ["amazon", "google", "meta", "microsoft", "bloomberg", "uber"],
    frequency: 76,
    leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
    description:
      "Design a structure that ingests a stream of integers and reports the running median on demand. The playground replays an ops/args list; `addNum` returns `null` and `findMedian` returns a number.",
    examples: [
      {
        input: 'ops = ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], args = [[],[1],[2],[],[3],[]]',
        output: "[null,null,null,1.5,null,2.0]",
      },
    ],
    intuition:
      "Split the values into a max-heap of the smaller half and a min-heap of the larger half, kept balanced in size. The median is then the top of the larger heap, or the average of both tops when sizes are equal — all in O(log n) per insert.",
    approach: [
      "Maintain a low max-heap and a high min-heap.",
      "Push to low, then move low's max into high to order them.",
      "Rebalance so high never has fewer elements than low.",
      "Median is high's top (odd count) or the average of both tops (even count).",
    ],
    complexity: { time: "O(log n) add, O(1) median", space: "O(n)", note: "Two heaps each hold about half the stream." },
    solutions: [
      {
        language: "python",
        label: "Two heaps",
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.low: list[int] = []   # max-heap via negation
        self.high: list[int] = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def findMedian(self) -> float:
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2`,
      },
      {
        language: "typescript",
        label: "Sorted insertion",
        code: `class MedianFinder {
  private values: number[] = [];

  addNum(num: number): void {
    let lo = 0, hi = this.values.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.values[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    this.values.splice(lo, 0, num);
  }

  findMedian(): number {
    const n = this.values.length, m = n >> 1;
    return n % 2 ? this.values[m] : (this.values[m - 1] + this.values[m]) / 2;
  }
}`,
      },
    ],
    runner: {
      entry: "runMedianFinder",
      comparison: "approx",
      jsStarter: `function runMedianFinder(ops, args) {
  // Replay the operations; addNum returns null, findMedian returns a number.
  // TODO: implement
}`,
      jsReference: `function runMedianFinder(ops, args) {
  class MedianFinder {
    constructor() { this.values = []; }
    addNum(num) {
      let lo = 0, hi = this.values.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (this.values[mid] < num) lo = mid + 1; else hi = mid;
      }
      this.values.splice(lo, 0, num);
    }
    findMedian() {
      const n = this.values.length, m = n >> 1;
      return n % 2 ? this.values[m] : (this.values[m - 1] + this.values[m]) / 2;
    }
  }
  const out = [];
  let mf = null;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i] || [];
    if (op === "MedianFinder") { mf = new MedianFinder(); out.push(null); }
    else if (op === "addNum") { mf.addNum(a[0]); out.push(null); }
    else if (op === "findMedian") out.push(mf.findMedian());
  }
  return out;
}`,
    },
    tests: [
      {
        name: "even then odd",
        args: [
          ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
          [[], [1], [2], [], [3], []],
        ],
        expected: [null, null, null, 1.5, null, 2.0],
        tolerance: 1e-5,
      },
      {
        name: "single",
        args: [
          ["MedianFinder", "addNum", "findMedian"],
          [[], [5], []],
        ],
        expected: [null, null, 5],
        tolerance: 1e-5,
      },
      {
        name: "four values",
        args: [
          ["MedianFinder", "addNum", "addNum", "addNum", "addNum", "findMedian"],
          [[], [1], [2], [3], [4], []],
        ],
        expected: [null, null, null, null, null, 2.5],
        tolerance: 1e-5,
      },
    ],
    hints: ["Balance a low and a high heap.", "Median lives at the heap tops."],
    relatedIds: [480, 215, 703],
  },
  {
    id: 621,
    slug: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Greedy", "Counting", "Math"],
    companies: ["amazon", "meta", "google", "microsoft", "uber"],
    frequency: 67,
    leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
    description:
      "Given task labels and a cooldown `n` that must separate two runs of the same task, return the minimum number of time units (including idles) to finish them all. The runner takes the task array and `n`.",
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8" },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: "6" },
    ],
    intuition:
      "The busiest task dictates the schedule: place its copies `n+1` apart, forming a frame of `(maxFreq − 1)·(n + 1)` slots plus one final group for every task tied at the max. If there are enough distinct tasks to fill the gaps, no idling is needed and the answer is just the task count.",
    approach: [
      "Count each task's frequency and find the maximum frequency.",
      "Count how many tasks share that maximum frequency.",
      "Compute frame = (maxFreq − 1)·(n + 1) + tiesAtMax.",
      "Answer is max(frame, total number of tasks).",
    ],
    complexity: { time: "O(t)", space: "O(1)", note: "t = number of tasks; at most 26 distinct labels." },
    solutions: [
      {
        language: "python",
        label: "Greedy formula",
        code: `from collections import Counter

def least_interval(tasks: list[str], n: int) -> int:
    counts = Counter(tasks)
    max_freq = max(counts.values())
    ties = sum(1 for v in counts.values() if v == max_freq)
    frame = (max_freq - 1) * (n + 1) + ties
    return max(frame, len(tasks))`,
      },
      {
        language: "typescript",
        label: "Greedy formula",
        code: `function leastInterval(tasks: string[], n: number): number {
  const counts = new Map<string, number>();
  for (const t of tasks) counts.set(t, (counts.get(t) ?? 0) + 1);
  let maxFreq = 0;
  for (const v of counts.values()) maxFreq = Math.max(maxFreq, v);
  let ties = 0;
  for (const v of counts.values()) if (v === maxFreq) ties++;
  const frame = (maxFreq - 1) * (n + 1) + ties;
  return Math.max(frame, tasks.length);
}`,
      },
    ],
    runner: {
      entry: "leastInterval",
      comparison: "deep",
      jsStarter: `function leastInterval(tasks, n) {
  // Return the minimum number of time units to run all tasks with cooldown n.
  // TODO: implement
}`,
      jsReference: `function leastInterval(tasks, n) {
  const counts = new Map();
  for (const t of tasks) counts.set(t, (counts.get(t) ?? 0) + 1);
  let maxFreq = 0;
  for (const v of counts.values()) maxFreq = Math.max(maxFreq, v);
  let ties = 0;
  for (const v of counts.values()) if (v === maxFreq) ties++;
  const frame = (maxFreq - 1) * (n + 1) + ties;
  return Math.max(frame, tasks.length);
}`,
    },
    tests: [
      { name: "cooldown 2", args: [["A", "A", "A", "B", "B", "B"], 2], expected: 8 },
      { name: "no cooldown", args: [["A", "A", "A", "B", "B", "B"], 0], expected: 6 },
      { name: "mixed", args: [["A", "C", "A", "B", "D", "B"], 1], expected: 6 },
      { name: "large gap", args: [["A", "A", "A", "B", "B", "B"], 3], expected: 10 },
    ],
    hints: ["The most frequent task sets the skeleton.", "Fill idle slots with other tasks."],
    relatedIds: [358, 767, 1834],
  },
  {
    id: 692,
    slug: "top-k-frequent-words",
    title: "Top K Frequent Words",
    difficulty: "Medium",
    category: "heap-priority-queue",
    patterns: ["Heap", "Hash Map", "Sorting"],
    companies: ["amazon", "google", "meta", "bloomberg", "microsoft"],
    frequency: 65,
    leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-words/",
    description:
      "Return the `k` most frequent words, ordering more frequent words first and breaking frequency ties alphabetically. The runner takes the word list and `k`.",
    examples: [
      { input: 'words = ["i","love","leetcode","i","love","coding"], k = 2', output: '["i","love"]' },
      { input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4', output: '["the","is","sunny","day"]' },
    ],
    intuition:
      "Tally each word's frequency, then order by frequency descending with a lexicographic tiebreaker. Sorting the distinct words by that combined key and taking the first `k` is fully deterministic.",
    approach: [
      "Count occurrences of each distinct word.",
      "Sort distinct words by frequency descending, then word ascending.",
      "Take the first k entries.",
    ],
    complexity: { time: "O(u log u)", space: "O(u)", note: "u = distinct words; a heap can do O(u log k)." },
    solutions: [
      {
        language: "python",
        label: "Sort by key",
        code: `from collections import Counter

def top_k_frequent(words: list[str], k: int) -> list[str]:
    counts = Counter(words)
    ordered = sorted(counts, key=lambda w: (-counts[w], w))
    return ordered[:k]`,
      },
      {
        language: "typescript",
        label: "Sort by key",
        code: `function topKFrequent(words: string[], k: number): string[] {
  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts.keys()]
    .sort((a, b) => {
      const fa = counts.get(a)!, fb = counts.get(b)!;
      return fa !== fb ? fb - fa : a < b ? -1 : a > b ? 1 : 0;
    })
    .slice(0, k);
}`,
      },
    ],
    runner: {
      entry: "topKFrequent",
      comparison: "deep",
      jsStarter: `function topKFrequent(words, k) {
  // Return the k most frequent words; ties broken alphabetically.
  // TODO: implement
}`,
      jsReference: `function topKFrequent(words, k) {
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts.keys()]
    .sort((a, b) => {
      const fa = counts.get(a), fb = counts.get(b);
      return fa !== fb ? fb - fa : a < b ? -1 : a > b ? 1 : 0;
    })
    .slice(0, k);
}`,
    },
    tests: [
      { name: "two", args: [["i", "love", "leetcode", "i", "love", "coding"], 2], expected: ["i", "love"] },
      {
        name: "four",
        args: [["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4],
        expected: ["the", "is", "sunny", "day"],
      },
      { name: "alpha tiebreak", args: [["a", "aa", "aaa"], 1], expected: ["a"] },
      { name: "sort ties", args: [["b", "a"], 2], expected: ["a", "b"] },
    ],
    hints: ["Frequency first, alphabetical second.", "A min-heap of size k also works."],
    relatedIds: [347, 451, 973],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Graphs
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 133,
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Hash Map"],
    companies: ["meta", "amazon", "google", "microsoft", "uber"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
    description:
      "Make a deep copy of a connected undirected graph. The runner encodes the graph as an adjacency list where `adjList[i]` lists the 1-indexed neighbors of node `i+1`, and returns the clone in the same adjacency-list shape.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
      { input: "adjList = [[]]", output: "[[]]" },
    ],
    intuition:
      "Copy each node exactly once and wire the copies together with the same edges. A hash map from original node to its clone prevents infinite loops on cycles and lets neighbors reference already-created copies.",
    approach: [
      "Materialize the input adjacency list into linked node objects.",
      "DFS the graph, creating a clone the first time you see each node.",
      "Recursively clone and attach each neighbor, reusing the map for visited nodes.",
      "Serialize the clones back into the adjacency-list shape.",
    ],
    complexity: { time: "O(V + E)", space: "O(V)", note: "Map of clones plus recursion stack." },
    solutions: [
      {
        language: "python",
        label: "DFS clone",
        code: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: Node | None) -> Node | None:
    if node is None:
        return None
    clones: dict[Node, Node] = {}

    def dfs(cur: Node) -> Node:
        if cur in clones:
            return clones[cur]
        copy = Node(cur.val)
        clones[cur] = copy
        copy.neighbors = [dfs(nb) for nb in cur.neighbors]
        return copy

    return dfs(node)`,
      },
      {
        language: "typescript",
        label: "DFS clone",
        code: `class GraphNode {
  val: number;
  neighbors: GraphNode[] = [];
  constructor(val = 0) {
    this.val = val;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;
  const clones = new Map<GraphNode, GraphNode>();
  const dfs = (cur: GraphNode): GraphNode => {
    const existing = clones.get(cur);
    if (existing) return existing;
    const copy = new GraphNode(cur.val);
    clones.set(cur, copy);
    for (const nb of cur.neighbors) copy.neighbors.push(dfs(nb));
    return copy;
  };
  return dfs(node);
}`,
      },
    ],
    runner: {
      entry: "cloneGraph",
      comparison: "deep",
      jsStarter: `function cloneGraph(adjList) {
  // adjList[i] are the 1-indexed neighbors of node i+1.
  // Deep-copy the graph and return the clone's adjacency list.
  // TODO: implement
}`,
      jsReference: `function cloneGraph(adjList) {
  const n = adjList.length;
  if (n === 0) return [];
  const nodes = [];
  for (let i = 0; i < n; i++) nodes.push({ val: i + 1, neighbors: [] });
  for (let i = 0; i < n; i++) for (const nb of adjList[i]) nodes[i].neighbors.push(nodes[nb - 1]);
  const clones = new Map();
  const dfs = (cur) => {
    const existing = clones.get(cur);
    if (existing) return existing;
    const copy = { val: cur.val, neighbors: [] };
    clones.set(cur, copy);
    for (const nb of cur.neighbors) copy.neighbors.push(dfs(nb));
    return copy;
  };
  for (const node of nodes) dfs(node);
  const byVal = new Map();
  for (const copy of clones.values()) byVal.set(copy.val, copy);
  const result = [];
  for (let v = 1; v <= n; v++) {
    const c = byVal.get(v);
    result.push(c ? c.neighbors.map((x) => x.val) : []);
  }
  return result;
}`,
    },
    tests: [
      { name: "four nodes", args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], expected: [[2, 4], [1, 3], [2, 4], [1, 3]] },
      { name: "single node", args: [[[]]], expected: [[]] },
      { name: "empty graph", args: [[]], expected: [] },
      { name: "two nodes", args: [[[2], [1]]], expected: [[2], [1]] },
    ],
    hints: ["Map original → copy.", "Clone neighbors recursively, reuse on revisit."],
    relatedIds: [138, 200, 207],
  },
  {
    id: 130,
    slug: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Union Find"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
    description:
      "On a board of `X` and `O`, flip every `O` region that is fully enclosed by `X` to `X`; regions touching a border survive. The runner takes the board and returns the updated board.",
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
      },
    ],
    intuition:
      "An `O` is safe exactly when it connects to the border. Flood-fill from every border `O` to mark all safe cells; then any `O` left unmarked is surrounded and becomes `X`, while marked cells revert to `O`.",
    approach: [
      "Scan the border and DFS each border `O`, marking reachable `O`s as safe.",
      "After marking, walk the whole grid.",
      "Turn unmarked `O`s into `X` (they are enclosed).",
      "Restore safe markers back to `O`.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)", note: "Recursion/visited proportional to cells." },
    solutions: [
      {
        language: "python",
        label: "Border DFS",
        code: `def solve(board: list[list[str]]) -> list[list[str]]:
    if not board:
        return board
    rows, cols = len(board), len(board[0])

    def mark(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != "O":
            return
        board[r][c] = "S"
        mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1)

    for r in range(rows):
        mark(r, 0); mark(r, cols - 1)
    for c in range(cols):
        mark(0, c); mark(rows - 1, c)

    for r in range(rows):
        for c in range(cols):
            board[r][c] = "O" if board[r][c] == "S" else "X"
    return board`,
      },
      {
        language: "typescript",
        label: "Border DFS",
        code: `function solve(board: string[][]): string[][] {
  const rows = board.length, cols = board[0]?.length ?? 0;
  const mark = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== "O") return;
    board[r][c] = "S";
    mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1);
  };
  for (let r = 0; r < rows; r++) { mark(r, 0); mark(r, cols - 1); }
  for (let c = 0; c < cols; c++) { mark(0, c); mark(rows - 1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      board[r][c] = board[r][c] === "S" ? "O" : "X";
  return board;
}`,
      },
    ],
    runner: {
      entry: "solve",
      comparison: "deep",
      jsStarter: `function solve(board) {
  // board is a 2-D grid of "X"/"O". Flip enclosed "O" regions to "X".
  // TODO: implement
}`,
      jsReference: `function solve(input) {
  // Clone so repeated runs start from the original board.
  const board = input.map((row) => row.slice());
  const rows = board.length, cols = board[0] ? board[0].length : 0;
  const mark = (r, c) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== "O") return;
    board[r][c] = "S";
    mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1);
  };
  for (let r = 0; r < rows; r++) { mark(r, 0); mark(r, cols - 1); }
  for (let c = 0; c < cols; c++) { mark(0, c); mark(rows - 1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      board[r][c] = board[r][c] === "S" ? "O" : "X";
  return board;
}`,
    },
    tests: [
      {
        name: "one enclosed region",
        args: [[["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]],
        expected: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
      },
      { name: "single border O", args: [[["O"]]], expected: [["O"]] },
      {
        name: "all on border",
        args: [[["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]]],
        expected: [["X", "O", "X"], ["O", "X", "O"], ["X", "O", "X"]],
      },
    ],
    hints: ["Border-connected O's are safe.", "Everything else is surrounded."],
    relatedIds: [200, 417, 1020],
  },
  {
    id: 547,
    slug: "number-of-provinces",
    title: "Number of Provinces",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Union Find"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 60,
    leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
    description:
      "Given an `n×n` symmetric matrix where `isConnected[i][j] = 1` means cities `i` and `j` are directly connected, count the number of connected groups (provinces). The runner takes the matrix and returns an integer.",
    examples: [
      { input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]", output: "2" },
      { input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]", output: "3" },
    ],
    intuition:
      "Provinces are the connected components of the friendship graph. Start a traversal from each unvisited city, mark everything reachable, and increment the province count once per new traversal.",
    approach: [
      "Keep a visited set over the cities.",
      "For each unvisited city, increment the count and DFS its connections.",
      "Inside the DFS, visit every directly connected, unvisited city.",
      "Return the total number of DFS launches.",
    ],
    complexity: { time: "O(n²)", space: "O(n)", note: "Scan the full adjacency matrix once." },
    solutions: [
      {
        language: "python",
        label: "DFS components",
        code: `def find_circle_num(is_connected: list[list[int]]) -> int:
    n = len(is_connected)
    visited = [False] * n

    def dfs(city: int) -> None:
        for other in range(n):
            if is_connected[city][other] == 1 and not visited[other]:
                visited[other] = True
                dfs(other)

    provinces = 0
    for city in range(n):
        if not visited[city]:
            visited[city] = True
            dfs(city)
            provinces += 1
    return provinces`,
      },
      {
        language: "typescript",
        label: "DFS components",
        code: `function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Array<boolean>(n).fill(false);
  const dfs = (city: number): void => {
    for (let other = 0; other < n; other++) {
      if (isConnected[city][other] === 1 && !visited[other]) {
        visited[other] = true;
        dfs(other);
      }
    }
  };
  let provinces = 0;
  for (let city = 0; city < n; city++) {
    if (!visited[city]) {
      visited[city] = true;
      dfs(city);
      provinces++;
    }
  }
  return provinces;
}`,
      },
    ],
    runner: {
      entry: "findCircleNum",
      comparison: "deep",
      jsStarter: `function findCircleNum(isConnected) {
  // Count connected components in the friendship adjacency matrix.
  // TODO: implement
}`,
      jsReference: `function findCircleNum(isConnected) {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  const dfs = (city) => {
    for (let other = 0; other < n; other++) {
      if (isConnected[city][other] === 1 && !visited[other]) {
        visited[other] = true;
        dfs(other);
      }
    }
  };
  let provinces = 0;
  for (let city = 0; city < n; city++) {
    if (!visited[city]) {
      visited[city] = true;
      dfs(city);
      provinces++;
    }
  }
  return provinces;
}`,
    },
    tests: [
      { name: "two provinces", args: [[[1, 1, 0], [1, 1, 0], [0, 0, 1]]], expected: 2 },
      { name: "all separate", args: [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], expected: 3 },
      { name: "all connected", args: [[[1, 1, 1], [1, 1, 1], [1, 1, 1]]], expected: 1 },
    ],
    hints: ["Count connected components.", "DFS/Union-Find both fit."],
    relatedIds: [200, 323, 1319],
  },
  {
    id: 1466,
    slug: "reorder-routes-to-make-all-paths-lead-to-the-city-zero",
    title: "Reorder Routes to Make All Paths Lead to the City Zero",
    difficulty: "Medium",
    category: "graphs",
    patterns: ["DFS", "BFS", "Graph"],
    companies: ["amazon", "google", "microsoft", "bytedance"],
    frequency: 56,
    leetcodeUrl: "https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/",
    description:
      "There are `n` cities joined by `n−1` directed roads forming a tree. Return the minimum number of roads whose direction must be flipped so that every city can reach city `0`. The runner takes `n` and the directed connections.",
    examples: [
      { input: "n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]", output: "3" },
      { input: "n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]", output: "2" },
    ],
    intuition:
      "Treat the roads as an undirected tree and traverse outward from city 0. Each original road that points away from 0 (in the direction you are walking) must be reversed; roads already pointing back toward 0 are fine. Tag each undirected edge with a cost of 1 for forward, 0 for backward.",
    approach: [
      "Build an undirected adjacency list, tagging real edges with cost 1 and their reverses with cost 0.",
      "DFS/BFS from city 0 over unvisited neighbors.",
      "Add the edge's cost (1 means it pointed away from 0 and needs flipping).",
      "Return the accumulated number of flips.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Tree traversal over n−1 edges." },
    solutions: [
      {
        language: "python",
        label: "DFS from 0",
        code: `def min_reorder(n: int, connections: list[list[int]]) -> int:
    adj: list[list[tuple[int, int]]] = [[] for _ in range(n)]
    for a, b in connections:
        adj[a].append((b, 1))
        adj[b].append((a, 0))

    visited = [False] * n
    flips = 0

    def dfs(city: int) -> None:
        nonlocal flips
        visited[city] = True
        for nei, cost in adj[city]:
            if not visited[nei]:
                flips += cost
                dfs(nei)

    dfs(0)
    return flips`,
      },
      {
        language: "typescript",
        label: "DFS from 0",
        code: `function minReorder(n: number, connections: number[][]): number {
  const adj: Array<Array<[number, number]>> = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push([b, 1]);
    adj[b].push([a, 0]);
  }
  const visited = new Array<boolean>(n).fill(false);
  let flips = 0;
  const dfs = (city: number): void => {
    visited[city] = true;
    for (const [nei, cost] of adj[city]) {
      if (!visited[nei]) {
        flips += cost;
        dfs(nei);
      }
    }
  };
  dfs(0);
  return flips;
}`,
      },
    ],
    runner: {
      entry: "minReorder",
      comparison: "deep",
      jsStarter: `function minReorder(n, connections) {
  // Count roads that must be flipped so every city can reach city 0.
  // TODO: implement
}`,
      jsReference: `function minReorder(n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    adj[a].push([b, 1]);
    adj[b].push([a, 0]);
  }
  const visited = new Array(n).fill(false);
  let flips = 0;
  const dfs = (city) => {
    visited[city] = true;
    for (const [nei, cost] of adj[city]) {
      if (!visited[nei]) {
        flips += cost;
        dfs(nei);
      }
    }
  };
  dfs(0);
  return flips;
}`,
    },
    tests: [
      { name: "six cities", args: [6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]], expected: 3 },
      { name: "five cities", args: [5, [[1, 0], [1, 2], [3, 2], [3, 4]]], expected: 2 },
      { name: "already inward", args: [3, [[1, 0], [2, 0]]], expected: 0 },
    ],
    hints: ["Walk outward from 0.", "Edges pointing away from 0 cost a flip."],
    relatedIds: [133, 207, 210],
  },
];

export default batchG;
