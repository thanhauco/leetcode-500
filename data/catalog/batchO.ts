import type { Problem } from "../types.ts";

/**
 * Catalog batch O — binary-tree problems.
 *
 * Trees travel through the playground as LeetCode level-order arrays (`null` for
 * a missing child). Every `runner.jsReference` rebuilds the tree from that array
 * inside the entry function, and tree-shaped outputs are returned as a trimmed
 * level-order array via an inline `serialize` helper. Problems whose answer may
 * legitimately vary in order/shape use `comparison: "canonical"`.
 */
export const batchO: Problem[] = [
  {
    id: 95,
    slug: "unique-binary-search-trees-ii",
    title: "Unique Binary Search Trees II",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Recursion", "Divide and Conquer", "BST"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 52,
    leetcodeUrl: "https://leetcode.com/problems/unique-binary-search-trees-ii/",
    description:
      "Given an integer `n`, build every structurally distinct binary search tree that stores exactly the values `1` through `n`. Return the trees as level-order arrays.",
    examples: [
      { input: "n = 1", output: "[[1]]" },
      { input: "n = 2", output: "[[1,null,2],[2,1,null]]", explanation: "Either value can be the root." },
    ],
    constraints: ["1 ≤ n ≤ 8"],
    intuition:
      "Pick each value `v` in `1..n` to be the root. Everything smaller must live in the left subtree and everything larger in the right subtree, so the answer is the Cartesian product of all left shapes with all right shapes. Recursing on the open interval `(lo, hi)` and combining results builds every tree exactly once.",
    approach: [
      "Recurse over a value range [lo, hi]; an empty range yields the single option `null`.",
      "For each root value v in [lo, hi], recursively gather all left subtrees from [lo, v-1] and all right subtrees from [v+1, hi].",
      "Pair every left option with every right option, attaching them under a fresh node valued v.",
      "Serialize each resulting root to a level-order array.",
    ],
    complexity: { time: "O(Cₙ · n)", space: "O(Cₙ · n)", note: "Cₙ is the nth Catalan number — the count of shapes." },
    solutions: [
      {
        language: "python",
        label: "Recursive build",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def generate_trees(n: int) -> list[TreeNode | None]:
    def build(lo: int, hi: int) -> list[TreeNode | None]:
        if lo > hi:
            return [None]
        out: list[TreeNode | None] = []
        for v in range(lo, hi + 1):
            for left in build(lo, v - 1):
                for right in build(v + 1, hi):
                    out.append(TreeNode(v, left, right))
        return out
    return build(1, n) if n else []`,
      },
      {
        language: "typescript",
        label: "Recursive build",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function generateTrees(n: number): (TreeNode | null)[] {
  function build(lo: number, hi: number): (TreeNode | null)[] {
    if (lo > hi) return [null];
    const out: (TreeNode | null)[] = [];
    for (let v = lo; v <= hi; v++) {
      for (const left of build(lo, v - 1)) {
        for (const right of build(v + 1, hi)) {
          out.push(new TreeNode(v, left, right));
        }
      }
    }
    return out;
  }
  return n ? build(1, n) : [];
}`,
      },
    ],
    runner: {
      entry: "generateTrees",
      comparison: "canonical",
      jsStarter: `function generateTrees(n) {
  // Return every BST holding 1..n as a list of level-order arrays.
  // TODO: implement
}`,
      jsReference: `function generateTrees(n) {
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function build(lo, hi) {
    if (lo > hi) return [null];
    const out = [];
    for (let v = lo; v <= hi; v++) {
      const lefts = build(lo, v - 1);
      const rights = build(v + 1, hi);
      for (const L of lefts) for (const R of rights) {
        out.push({ val: v, left: L, right: R });
      }
    }
    return out;
  }
  if (n === 0) return [];
  return build(1, n).map(serialize);
}`,
    },
    tests: [
      { name: "n=1", args: [1], expected: [[1]] },
      { name: "n=2", args: [2], expected: [[1, null, 2], [2, 1]] },
      {
        name: "n=3",
        args: [3],
        expected: [
          [1, null, 2, null, 3],
          [1, null, 3, 2],
          [2, 1, 3],
          [3, 1, null, null, 2],
          [3, 2, null, 1],
        ],
      },
      { name: "n=0", args: [0], expected: [] },
    ],
    relatedIds: [96, 894, 241],
  },

  {
    id: 109,
    slug: "convert-sorted-list-to-binary-search-tree",
    title: "Convert Sorted List to Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Divide and Conquer", "BST", "Recursion"],
    companies: ["amazon", "microsoft", "google", "apple"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/",
    description:
      "Given the values of a sorted singly linked list (ascending), build a height-balanced binary search tree and return it as a level-order array. The middle element of each range becomes the subtree root.",
    examples: [
      { input: "values = [-10,-3,0,5,9]", output: "[0,-10,5,null,-3,null,9]" },
      { input: "values = []", output: "[]" },
    ],
    constraints: ["0 ≤ values.length ≤ 10^4", "values is sorted in ascending order"],
    intuition:
      "Because the list is already sorted, the middle value is the natural root: it splits the rest into a smaller left half and a larger right half of nearly equal size. Recursing on each half with the same rule keeps the height balanced. Choosing the lower middle index makes the construction deterministic.",
    approach: [
      "Treat the values as an indexable array of the sorted list.",
      "For range [lo, hi], pick mid = (lo + hi) >> 1 as the root value.",
      "Recursively build the left subtree from [lo, mid-1] and the right subtree from [mid+1, hi].",
      "Serialize the finished root to a level-order array.",
    ],
    complexity: { time: "O(n)", space: "O(log n)", note: "Each value used once; recursion depth is the tree height." },
    solutions: [
      {
        language: "python",
        label: "Index-based middle",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def sorted_list_to_bst(values: list[int]) -> TreeNode | None:
    def build(lo: int, hi: int) -> TreeNode | None:
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        return TreeNode(values[mid], build(lo, mid - 1), build(mid + 1, hi))
    return build(0, len(values) - 1)`,
      },
      {
        language: "typescript",
        label: "Index-based middle",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function sortedListToBST(values: number[]): TreeNode | null {
  function build(lo: number, hi: number): TreeNode | null {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    return new TreeNode(values[mid], build(lo, mid - 1), build(mid + 1, hi));
  }
  return build(0, values.length - 1);
}`,
      },
    ],
    runner: {
      entry: "sortedListToBST",
      comparison: "deep",
      jsStarter: `function sortedListToBST(values) {
  // 'values' is the sorted list; return the balanced BST as a level-order array.
  // TODO: implement
}`,
      jsReference: `function sortedListToBST(values) {
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function build(lo, hi) {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    return { val: values[mid], left: build(lo, mid - 1), right: build(mid + 1, hi) };
  }
  return serialize(build(0, values.length - 1));
}`,
    },
    tests: [
      { name: "five values", args: [[-10, -3, 0, 5, 9]], expected: [0, -10, 5, null, -3, null, 9] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "three", args: [[1, 2, 3]], expected: [2, 1, 3] },
    ],
    relatedIds: [108, 110],
  },

  {
    id: 654,
    slug: "maximum-binary-tree",
    title: "Maximum Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Divide and Conquer", "Recursion"],
    companies: ["amazon", "microsoft", "google", "bloomberg"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/maximum-binary-tree/",
    description:
      "Given an array `nums` of distinct integers, the maximum binary tree puts the largest value at the root, with the maximum tree of the elements to its left as the left child and the maximum tree of the elements to its right as the right child. Return it as a level-order array.",
    examples: [
      { input: "nums = [3,2,1,6,0,5]", output: "[6,3,5,null,2,0,null,null,1]" },
      { input: "nums = [3,2,1]", output: "[3,null,2,null,1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 1000", "All values are distinct."],
    intuition:
      "The definition is directly recursive: find the maximum in the current slice, make it the root, then apply the same rule to the slice on its left and the slice on its right. Each value becomes a root exactly once, when it is the maximum of its sub-range.",
    approach: [
      "For range [lo, hi], scan to find the index of the maximum value.",
      "Create a node for that value.",
      "Recursively build the left child from [lo, maxIdx-1] and the right child from [maxIdx+1, hi].",
      "Serialize the root to a level-order array.",
    ],
    complexity: { time: "O(n²)", space: "O(n)", note: "Worst case (sorted input) scans degrade to quadratic." },
    solutions: [
      {
        language: "python",
        label: "Recursive max-split",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def construct_maximum_binary_tree(nums: list[int]) -> TreeNode | None:
    def build(lo: int, hi: int) -> TreeNode | None:
        if lo > hi:
            return None
        mi = lo
        for i in range(lo + 1, hi + 1):
            if nums[i] > nums[mi]:
                mi = i
        return TreeNode(nums[mi], build(lo, mi - 1), build(mi + 1, hi))
    return build(0, len(nums) - 1)`,
      },
      {
        language: "typescript",
        label: "Recursive max-split",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  function build(lo: number, hi: number): TreeNode | null {
    if (lo > hi) return null;
    let mi = lo;
    for (let i = lo + 1; i <= hi; i++) if (nums[i] > nums[mi]) mi = i;
    return new TreeNode(nums[mi], build(lo, mi - 1), build(mi + 1, hi));
  }
  return build(0, nums.length - 1);
}`,
      },
    ],
    runner: {
      entry: "constructMaximumBinaryTree",
      comparison: "deep",
      jsStarter: `function constructMaximumBinaryTree(nums) {
  // Return the maximum binary tree as a level-order array.
  // TODO: implement
}`,
      jsReference: `function constructMaximumBinaryTree(nums) {
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function build(lo, hi) {
    if (lo > hi) return null;
    let mi = lo;
    for (let i = lo + 1; i <= hi; i++) if (nums[i] > nums[mi]) mi = i;
    return { val: nums[mi], left: build(lo, mi - 1), right: build(mi + 1, hi) };
  }
  return serialize(build(0, nums.length - 1));
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[3, 2, 1, 6, 0, 5]], expected: [6, 3, 5, null, 2, 0, null, null, 1] },
      { name: "descending", args: [[3, 2, 1]], expected: [3, null, 2, null, 1] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "two", args: [[2, 1]], expected: [2, null, 1] },
    ],
    relatedIds: [998, 53],
  },

  {
    id: 662,
    slug: "maximum-width-of-binary-tree",
    title: "Maximum Width of Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Level Order", "Indexing"],
    companies: ["amazon", "microsoft", "bloomberg", "linkedin"],
    frequency: 58,
    leetcodeUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/",
    description:
      "The width of a tree level is the distance between its leftmost and rightmost present nodes, counting the `null` slots that would sit between them as if the tree were complete. Return the maximum width across all levels.",
    examples: [
      { input: "root = [1,3,2,5,3,null,9]", output: "4" },
      { input: "root = [1,3,null,5,3]", output: "2" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 3000", "-100 ≤ Node.val ≤ 100"],
    intuition:
      "Assign each node the heap-style index it would hold in a complete tree: a node at index `i` has children at `2i` and `2i+1`. A level's width is simply the last index minus the first index plus one. Re-basing indices to start at zero each level keeps the numbers small enough to stay exact.",
    approach: [
      "BFS level by level, pairing each node with its positional index.",
      "Subtract the first index of the level from every index to prevent overflow.",
      "Compute width = lastIndex - firstIndex + 1 and track the maximum.",
      "Push children with indices 2*idx and 2*idx+1.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Each node enters the queue once." },
    solutions: [
      {
        language: "python",
        label: "Indexed BFS",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def width_of_binary_tree(root: TreeNode | None) -> int:
    if not root:
        return 0
    best = 0
    q = deque([(root, 0)])
    while q:
        first = q[0][1]
        width = q[-1][1] - first + 1
        best = max(best, width)
        for _ in range(len(q)):
            node, idx = q.popleft()
            idx -= first
            if node.left:
                q.append((node.left, 2 * idx))
            if node.right:
                q.append((node.right, 2 * idx + 1))
    return best`,
      },
      {
        language: "typescript",
        label: "Indexed BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0;
  let best = 0;
  let level: [TreeNode, number][] = [[root, 0]];
  while (level.length) {
    const first = level[0][1];
    best = Math.max(best, level[level.length - 1][1] - first + 1);
    const next: [TreeNode, number][] = [];
    for (const [node, i] of level) {
      const idx = i - first;
      if (node.left) next.push([node.left, 2 * idx]);
      if (node.right) next.push([node.right, 2 * idx + 1]);
    }
    level = next;
  }
  return best;
}`,
      },
    ],
    runner: {
      entry: "widthOfBinaryTree",
      comparison: "deep",
      jsStarter: `function widthOfBinaryTree(level) {
  // 'level' is the tree as a level-order array; return the maximum level width.
  // TODO: implement
}`,
      jsReference: `function widthOfBinaryTree(level) {
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
  if (!root) return 0;
  let best = 0;
  let cur = [[root, 0]];
  while (cur.length) {
    const first = cur[0][1];
    best = Math.max(best, cur[cur.length - 1][1] - first + 1);
    const next = [];
    for (const [node, i] of cur) {
      const idx = i - first;
      if (node.left) next.push([node.left, 2 * idx]);
      if (node.right) next.push([node.right, 2 * idx + 1]);
    }
    cur = next;
  }
  return best;
}`,
    },
    tests: [
      { name: "gap level", args: [[1, 3, 2, 5, 3, null, 9]], expected: 4 },
      { name: "skewed pair", args: [[1, 3, null, 5, 3]], expected: 2 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "empty", args: [[]], expected: 0 },
    ],
    relatedIds: [104, 515],
  },

  {
    id: 513,
    slug: "find-bottom-left-tree-value",
    title: "Find Bottom Left Tree Value",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Level Order"],
    companies: ["amazon", "microsoft", "meta"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/find-bottom-left-tree-value/",
    description:
      "Return the value of the leftmost node on the deepest (bottom-most) level of a binary tree.",
    examples: [
      { input: "root = [2,1,3]", output: "1" },
      { input: "root = [1,2,3,4,null,5,6,null,null,7]", output: "7" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^4", "-2^31 ≤ Node.val ≤ 2^31 - 1"],
    intuition:
      "Do a breadth-first sweep, always enqueuing the left child before the right. The first node dequeued on each new level is that level's leftmost; when the queue finally empties, the last level's leftmost is the answer.",
    approach: [
      "Run BFS level by level.",
      "At the start of each level, record the value of its first (leftmost) node.",
      "Advance to the next level by collecting children left-to-right.",
      "Return the last recorded leftmost value.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Holds at most one level in the queue." },
    solutions: [
      {
        language: "python",
        label: "Level-order BFS",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_bottom_left_value(root: TreeNode | None) -> int:
    q = deque([root])
    ans = root.val
    while q:
        ans = q[0].val
        for _ in range(len(q)):
            node = q.popleft()
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return ans`,
      },
      {
        language: "typescript",
        label: "Level-order BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function findBottomLeftValue(root: TreeNode): number {
  let level: TreeNode[] = [root];
  let ans = root.val;
  while (level.length) {
    ans = level[0].val;
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "findBottomLeftValue",
      comparison: "deep",
      jsStarter: `function findBottomLeftValue(level) {
  // Return the leftmost value on the deepest level.
  // TODO: implement
}`,
      jsReference: `function findBottomLeftValue(level) {
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
  let cur = [root];
  let ans = root.val;
  while (cur.length) {
    ans = cur[0].val;
    const next = [];
    for (const node of cur) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    cur = next;
  }
  return ans;
}`,
    },
    tests: [
      { name: "three nodes", args: [[2, 1, 3]], expected: 1 },
      { name: "deep left", args: [[1, 2, 3, 4, null, 5, 6, null, null, 7]], expected: 7 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "balanced", args: [[1, 2, 3, 4, 5]], expected: 4 },
    ],
    relatedIds: [515, 199],
  },

  {
    id: 515,
    slug: "find-largest-value-in-each-tree-row",
    title: "Find Largest Value in Each Tree Row",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Level Order"],
    companies: ["amazon", "microsoft", "linkedin"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/find-largest-value-in-each-tree-row/",
    description:
      "Return an array whose i-th entry is the largest value found among all nodes on row `i` of the tree (the root is row 0).",
    examples: [
      { input: "root = [1,3,2,5,3,null,9]", output: "[1,3,9]" },
      { input: "root = [1,2,3]", output: "[1,3]" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 10^4", "-2^31 ≤ Node.val ≤ 2^31 - 1"],
    intuition:
      "Each tree row maps to one output value, so a level-order traversal lines up perfectly: scan every node on a level, keep the running maximum, and emit it before descending to the next level.",
    approach: [
      "Return an empty list immediately for an empty tree.",
      "BFS level by level.",
      "Track the maximum value seen on the current level.",
      "Append that maximum and move on to the children.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Queue holds one level at a time." },
    solutions: [
      {
        language: "python",
        label: "Level-order BFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def largest_values(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    res: list[int] = []
    level = [root]
    while level:
        res.append(max(node.val for node in level))
        nxt: list[TreeNode] = []
        for node in level:
            if node.left:
                nxt.append(node.left)
            if node.right:
                nxt.append(node.right)
        level = nxt
    return res`,
      },
      {
        language: "typescript",
        label: "Level-order BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];
  let level: TreeNode[] = [root];
  while (level.length) {
    let mx = -Infinity;
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.val > mx) mx = node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(mx);
    level = next;
  }
  return res;
}`,
      },
    ],
    runner: {
      entry: "largestValues",
      comparison: "deep",
      jsStarter: `function largestValues(level) {
  // Return the maximum value of each tree row.
  // TODO: implement
}`,
      jsReference: `function largestValues(level) {
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
  const res = [];
  let cur = [root];
  while (cur.length) {
    let mx = -Infinity;
    const next = [];
    for (const node of cur) {
      if (node.val > mx) mx = node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(mx);
    cur = next;
  }
  return res;
}`,
    },
    tests: [
      { name: "mixed rows", args: [[1, 3, 2, 5, 3, null, 9]], expected: [1, 3, 9] },
      { name: "two rows", args: [[1, 2, 3]], expected: [1, 3] },
      { name: "empty", args: [[]], expected: [] },
      { name: "single", args: [[1]], expected: [1] },
    ],
    relatedIds: [102, 513],
  },

  {
    id: 863,
    slug: "all-nodes-distance-k-in-binary-tree",
    title: "All Nodes Distance K in Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Graph", "Parent Pointers"],
    companies: ["amazon", "meta", "google", "microsoft", "bloomberg"],
    frequency: 72,
    leetcodeUrl: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
    description:
      "Given a binary tree, a target node's value, and an integer `k`, return the values of every node that is exactly `k` edges away from the target. Order does not matter.",
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2", output: "[7,4,1]" },
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], target = 3, k = 0", output: "[3]" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 500", "All values are unique.", "0 ≤ k ≤ 1000"],
    intuition:
      "Distance in a tree is symmetric once you can also walk upward, so add parent pointers to turn the tree into an undirected graph. A breadth-first search from the target then reaches every node at distance exactly `k` after `k` expansion rounds.",
    approach: [
      "DFS once to record each node's parent and to locate the target node.",
      "BFS outward from the target across left child, right child, and parent edges.",
      "Use a visited set so you never revisit a node.",
      "After k rounds, the current frontier holds every node at distance k.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Parent map plus BFS frontier." },
    solutions: [
      {
        language: "python",
        label: "Parent map + BFS",
        code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def distance_k(root: TreeNode, target: int, k: int) -> list[int]:
    parent: dict[TreeNode, TreeNode | None] = {}
    target_node = None

    def dfs(node, par):
        nonlocal target_node
        if not node:
            return
        parent[node] = par
        if node.val == target:
            target_node = node
        dfs(node.left, node)
        dfs(node.right, node)

    dfs(root, None)
    if target_node is None:
        return []
    seen = {target_node}
    q = deque([target_node])
    dist = 0
    while q and dist < k:
        for _ in range(len(q)):
            node = q.popleft()
            for nb in (node.left, node.right, parent[node]):
                if nb and nb not in seen:
                    seen.add(nb)
                    q.append(nb)
        dist += 1
    return [node.val for node in q] if dist == k else []`,
      },
      {
        language: "typescript",
        label: "Parent map + BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function distanceK(root: TreeNode | null, target: number, k: number): number[] {
  const parent = new Map<TreeNode, TreeNode | null>();
  let targetNode: TreeNode | null = null;
  const dfs = (node: TreeNode | null, par: TreeNode | null) => {
    if (!node) return;
    parent.set(node, par);
    if (node.val === target) targetNode = node;
    dfs(node.left, node);
    dfs(node.right, node);
  };
  dfs(root, null);
  if (!targetNode) return [];
  const seen = new Set<TreeNode>([targetNode]);
  let frontier: TreeNode[] = [targetNode];
  let dist = 0;
  while (frontier.length && dist < k) {
    const next: TreeNode[] = [];
    for (const node of frontier) {
      for (const nb of [node.left, node.right, parent.get(node)!]) {
        if (nb && !seen.has(nb)) {
          seen.add(nb);
          next.push(nb);
        }
      }
    }
    frontier = next;
    dist++;
  }
  return dist === k ? frontier.map((n) => n.val) : [];
}`,
      },
    ],
    runner: {
      entry: "distanceK",
      comparison: "canonical",
      jsStarter: `function distanceK(level, target, k) {
  // Return values of all nodes exactly k edges from the target node.
  // TODO: implement
}`,
      jsReference: `function distanceK(level, target, k) {
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
  const parent = new Map();
  let targetNode = null;
  (function dfs(node, par) {
    if (!node) return;
    parent.set(node, par);
    if (node.val === target) targetNode = node;
    dfs(node.left, node);
    dfs(node.right, node);
  })(root, null);
  if (!targetNode) return [];
  const seen = new Set([targetNode]);
  let frontier = [targetNode];
  let dist = 0;
  while (frontier.length && dist < k) {
    const next = [];
    for (const node of frontier) {
      for (const nb of [node.left, node.right, parent.get(node)]) {
        if (nb && !seen.has(nb)) { seen.add(nb); next.push(nb); }
      }
    }
    frontier = next;
    dist++;
  }
  return dist === k ? frontier.map((n) => n.val) : [];
}`,
    },
    tests: [
      { name: "k=2", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 2], expected: [7, 4, 1] },
      { name: "k=1", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: [6, 2, 3] },
      { name: "k=0", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 3, 0], expected: [3] },
      { name: "k beyond tree", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 3, 10], expected: [] },
    ],
    relatedIds: [662, 1110],
  },

  {
    id: 951,
    slug: "flip-equivalent-binary-trees",
    title: "Flip Equivalent Binary Trees",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["google", "amazon", "microsoft"],
    frequency: 48,
    leetcodeUrl: "https://leetcode.com/problems/flip-equivalent-binary-trees/",
    description:
      "A flip swaps a node's left and right subtrees. Two trees are flip-equivalent if some sequence of flips turns one into the other. Given two trees as level-order arrays, decide whether they are flip-equivalent.",
    examples: [
      { input: "root1 = [1,2,3], root2 = [1,3,2]", output: "true", explanation: "Flip the children of the root." },
      { input: "root1 = [1,2,3], root2 = [1,2,3,4]", output: "false" },
    ],
    constraints: ["0 ≤ number of nodes ≤ 100", "Values within a tree are unique."],
    intuition:
      "At each pair of nodes the values must match, and then the children must line up either directly (no flip) or crosswise (a flip). Recursing with that two-way check covers every possible flip combination without enumerating them.",
    approach: [
      "If both nodes are null they match; if exactly one is null or the values differ, they do not.",
      "Recurse without a flip: left-with-left and right-with-right.",
      "Recurse with a flip: left-with-right and right-with-left.",
      "Return true if either arrangement holds.",
    ],
    complexity: { time: "O(min(n, m))", space: "O(min(h₁, h₂))", note: "Stops as soon as a structure diverges." },
    solutions: [
      {
        language: "python",
        label: "Recursive two-way match",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def flip_equiv(a: TreeNode | None, b: TreeNode | None) -> bool:
    if a is None and b is None:
        return True
    if a is None or b is None or a.val != b.val:
        return False
    return (flip_equiv(a.left, b.left) and flip_equiv(a.right, b.right)) or (
        flip_equiv(a.left, b.right) and flip_equiv(a.right, b.left)
    )`,
      },
      {
        language: "typescript",
        label: "Recursive two-way match",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function flipEquiv(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null || a.val !== b.val) return false;
  return (
    (flipEquiv(a.left, b.left) && flipEquiv(a.right, b.right)) ||
    (flipEquiv(a.left, b.right) && flipEquiv(a.right, b.left))
  );
}`,
      },
    ],
    runner: {
      entry: "flipEquiv",
      comparison: "deep",
      jsStarter: `function flipEquiv(level1, level2) {
  // Return whether the two trees are flip-equivalent.
  // TODO: implement
}`,
      jsReference: `function flipEquiv(level1, level2) {
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
  function eq(x, y) {
    if (x === null && y === null) return true;
    if (x === null || y === null || x.val !== y.val) return false;
    return (eq(x.left, y.left) && eq(x.right, y.right)) || (eq(x.left, y.right) && eq(x.right, y.left));
  }
  return eq(build(level1), build(level2));
}`,
    },
    tests: [
      { name: "root flip", args: [[1, 2, 3], [1, 3, 2]], expected: true },
      { name: "nested flip", args: [[1, 2, 3, 4], [1, 3, 2, null, null, null, 4]], expected: true },
      { name: "different sizes", args: [[1, 2, 3], [1, 2, 3, 4]], expected: false },
      { name: "both empty", args: [[], []], expected: true },
    ],
    relatedIds: [100, 226],
  },

  {
    id: 1110,
    slug: "delete-nodes-and-return-forest",
    title: "Delete Nodes And Return Forest",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "google", "microsoft", "bloomberg"],
    frequency: 55,
    leetcodeUrl: "https://leetcode.com/problems/delete-nodes-and-return-forest/",
    description:
      "Delete every node whose value appears in `to_delete`. Deleting a node detaches its surviving children, splitting the tree into a forest. Return the roots of all resulting trees as level-order arrays.",
    examples: [
      { input: "root = [1,2,3,4,5,6,7], to_delete = [3,5]", output: "[[1,2,null,4],[6],[7]]" },
      { input: "root = [1,2,3], to_delete = [1]", output: "[[2],[3]]" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 1000", "Values are distinct.", "1 ≤ to_delete.length ≤ 1000"],
    intuition:
      "A node becomes a new tree root exactly when it survives but its parent was deleted (or it is the original root). A single post-order pass lets each call know whether its parent vanished, so it can both prune deleted nodes and register newly orphaned subtrees.",
    approach: [
      "Put the deletion targets in a set.",
      "DFS carrying a flag for whether the current node's parent was deleted.",
      "If a surviving node's parent was deleted (or it is the root), add it to the forest.",
      "Return null up the chain when a node is deleted so the parent drops the link, and serialize each forest root.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "One traversal plus the forest output." },
    solutions: [
      {
        language: "python",
        label: "Post-order prune",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def del_nodes(root: TreeNode | None, to_delete: list[int]) -> list[TreeNode]:
    targets = set(to_delete)
    forest: list[TreeNode] = []

    def dfs(node, is_root):
        if not node:
            return None
        deleted = node.val in targets
        if is_root and not deleted:
            forest.append(node)
        node.left = dfs(node.left, deleted)
        node.right = dfs(node.right, deleted)
        return None if deleted else node

    dfs(root, True)
    return forest`,
      },
      {
        language: "typescript",
        label: "Post-order prune",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function delNodes(root: TreeNode | null, toDelete: number[]): TreeNode[] {
  const targets = new Set(toDelete);
  const forest: TreeNode[] = [];
  const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
    if (!node) return null;
    const deleted = targets.has(node.val);
    if (isRoot && !deleted) forest.push(node);
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);
    return deleted ? null : node;
  };
  dfs(root, true);
  return forest;
}`,
      },
    ],
    runner: {
      entry: "delNodes",
      comparison: "canonical",
      jsStarter: `function delNodes(level, toDelete) {
  // Return the forest (as level-order arrays) after deleting the given values.
  // TODO: implement
}`,
      jsReference: `function delNodes(level, toDelete) {
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
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  const root = build(level);
  const targets = new Set(toDelete);
  const forest = [];
  function dfs(node, isRoot) {
    if (!node) return null;
    const deleted = targets.has(node.val);
    if (isRoot && !deleted) forest.push(node);
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);
    return deleted ? null : node;
  }
  dfs(root, true);
  return forest.map(serialize);
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[1, 2, 3, 4, 5, 6, 7], [3, 5]], expected: [[1, 2, null, 4], [6], [7]] },
      { name: "delete root", args: [[1, 2, 3], [1]], expected: [[2], [3]] },
      { name: "delete nothing", args: [[1, 2, 3], []], expected: [[1, 2, 3]] },
      { name: "delete only node", args: [[1], [1]], expected: [] },
    ],
    relatedIds: [863, 1325],
  },

  {
    id: 1325,
    slug: "delete-leaves-with-a-given-value",
    title: "Delete Leaves With a Given Value",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion", "Post-order"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 45,
    leetcodeUrl: "https://leetcode.com/problems/delete-leaves-with-a-given-value/",
    description:
      "Repeatedly remove every leaf whose value equals `target`. Removing a leaf may expose its parent as a new matching leaf, so the deletion cascades upward. Return the final tree as a level-order array.",
    examples: [
      { input: "root = [1,2,3,2,null,2,4], target = 2", output: "[1,null,3,null,4]" },
      { input: "root = [1,1,1], target = 1", output: "[]" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 3000", "1 ≤ Node.val, target ≤ 10^4"],
    intuition:
      "Process children before the parent. After both subtrees are pruned, a node may have just become a leaf — and if its value is the target it should disappear too. A single post-order pass naturally handles the cascade.",
    approach: [
      "Recurse into the left and right children first, replacing them with their pruned results.",
      "After recursion, check whether the node is now a leaf with the target value.",
      "If so, return null to delete it; otherwise return the node.",
      "Serialize whatever remains of the root.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Post-order recursion to tree height h." },
    solutions: [
      {
        language: "python",
        label: "Post-order delete",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def remove_leaf_nodes(root: TreeNode | None, target: int) -> TreeNode | None:
    if not root:
        return None
    root.left = remove_leaf_nodes(root.left, target)
    root.right = remove_leaf_nodes(root.right, target)
    if not root.left and not root.right and root.val == target:
        return None
    return root`,
      },
      {
        language: "typescript",
        label: "Post-order delete",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function removeLeafNodes(root: TreeNode | null, target: number): TreeNode | null {
  if (!root) return null;
  root.left = removeLeafNodes(root.left, target);
  root.right = removeLeafNodes(root.right, target);
  if (!root.left && !root.right && root.val === target) return null;
  return root;
}`,
      },
    ],
    runner: {
      entry: "removeLeafNodes",
      comparison: "deep",
      jsStarter: `function removeLeafNodes(level, target) {
  // Repeatedly delete target-valued leaves; return the level-order array.
  // TODO: implement
}`,
      jsReference: `function removeLeafNodes(level, target) {
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
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  function prune(node) {
    if (!node) return null;
    node.left = prune(node.left);
    node.right = prune(node.right);
    if (!node.left && !node.right && node.val === target) return null;
    return node;
  }
  return serialize(prune(build(level)));
}`,
    },
    tests: [
      { name: "cascade", args: [[1, 2, 3, 2, null, 2, 4], 2], expected: [1, null, 3, null, 4] },
      { name: "whole tree", args: [[1, 1, 1], 1], expected: [] },
      { name: "one leaf", args: [[1, 2, 3], 3], expected: [1, 2] },
      { name: "single match", args: [[1], 1], expected: [] },
    ],
    relatedIds: [1110, 814],
  },

  {
    id: 1372,
    slug: "longest-zigzag-path-in-a-binary-tree",
    title: "Longest ZigZag Path in a Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion", "Tree DP"],
    companies: ["amazon", "microsoft", "bytedance"],
    frequency: 51,
    leetcodeUrl: "https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/",
    description:
      "A zigzag path alternates direction at every step (left, then right, then left, …). Its length is the number of edges traveled. Return the length of the longest zigzag path anywhere in the tree.",
    examples: [
      { input: "root = [1,null,2,3,null,null,4]", output: "3" },
      { input: "root = [1,2,3]", output: "1" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 5 · 10^4", "1 ≤ Node.val ≤ 100"],
    intuition:
      "For each node, the best zigzag that starts by stepping left equals one plus the best zigzag that the left child can extend by stepping right — and symmetrically for the right. Returning both values up the recursion lets a global maximum capture the longest alternating run.",
    approach: [
      "Recurse returning a pair: the longest zigzag continuing left and continuing right from this node.",
      "Going left uses the child's right-continuation: 1 + leftChild.right.",
      "Going right uses the child's left-continuation: 1 + rightChild.left.",
      "Update a global best with both directions; a null child contributes -1 so a single step counts as length 0.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single post-order traversal." },
    solutions: [
      {
        language: "python",
        label: "Tree DP",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def longest_zigzag(root: TreeNode | None) -> int:
    best = 0

    def dfs(node):
        nonlocal best
        if not node:
            return (-1, -1)
        left = dfs(node.left)[1] + 1
        right = dfs(node.right)[0] + 1
        best = max(best, left, right)
        return (left, right)

    dfs(root)
    return best`,
      },
      {
        language: "typescript",
        label: "Tree DP",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function longestZigZag(root: TreeNode | null): number {
  let best = 0;
  const dfs = (node: TreeNode | null): [number, number] => {
    if (!node) return [-1, -1];
    const left = dfs(node.left)[1] + 1;
    const right = dfs(node.right)[0] + 1;
    best = Math.max(best, left, right);
    return [left, right];
  };
  dfs(root);
  return best;
}`,
      },
    ],
    runner: {
      entry: "longestZigZag",
      comparison: "deep",
      jsStarter: `function longestZigZag(level) {
  // Return the length (in edges) of the longest zigzag path.
  // TODO: implement
}`,
      jsReference: `function longestZigZag(level) {
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
  let best = 0;
  function dfs(node) {
    if (!node) return [-1, -1];
    const left = dfs(node.left)[1] + 1;
    const right = dfs(node.right)[0] + 1;
    best = Math.max(best, left, right);
    return [left, right];
  }
  dfs(root);
  return best;
}`,
    },
    tests: [
      { name: "alternating chain", args: [[1, null, 2, 3, null, null, 4]], expected: 3 },
      { name: "small", args: [[1, 2, 3]], expected: 1 },
      { name: "single", args: [[1]], expected: 0 },
      { name: "perfect tree", args: [[1, 1, 1, 1, 1, 1, 1]], expected: 2 },
    ],
    relatedIds: [543, 124],
  },

  {
    id: 1339,
    slug: "maximum-product-of-splitted-binary-tree",
    title: "Maximum Product of Splitted Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Subtree Sums"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 44,
    leetcodeUrl: "https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/",
    description:
      "Remove a single edge to split the tree into two parts and multiply the sums of the two parts. Return the maximum such product. (LeetCode takes the answer modulo 1e9+7; the cases here stay small enough that no reduction is needed.)",
    examples: [
      { input: "root = [1,2,3,4,5,6]", output: "110", explanation: "Best split gives sums 11 and 10." },
      { input: "root = [1,2,3]", output: "9" },
    ],
    constraints: ["2 ≤ number of nodes ≤ 5 · 10^4", "1 ≤ Node.val ≤ 10^4"],
    intuition:
      "Cutting the edge above any node leaves that node's subtree on one side and everything else on the other. So once you know the total sum and every subtree sum, each candidate product is `subtreeSum × (total − subtreeSum)` — just take the maximum.",
    approach: [
      "Compute the total sum of all node values with a first traversal that records every subtree sum.",
      "For each recorded subtree sum s, evaluate s × (total − s).",
      "Track the maximum product over all subtree sums.",
      "Return the maximum (mod 1e9+7).",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Stores one sum per node." },
    solutions: [
      {
        language: "python",
        label: "Two-pass subtree sums",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_product(root: TreeNode | None) -> int:
    sums: list[int] = []

    def total(node):
        if not node:
            return 0
        s = node.val + total(node.left) + total(node.right)
        sums.append(s)
        return s

    grand = total(root)
    best = max(s * (grand - s) for s in sums)
    return best % (10**9 + 7)`,
      },
      {
        language: "typescript",
        label: "Two-pass subtree sums",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxProduct(root: TreeNode | null): number {
  const sums: number[] = [];
  const total = (node: TreeNode | null): number => {
    if (!node) return 0;
    const s = node.val + total(node.left) + total(node.right);
    sums.push(s);
    return s;
  };
  const grand = total(root);
  let best = 0;
  for (const s of sums) best = Math.max(best, s * (grand - s));
  return best % 1000000007;
}`,
      },
    ],
    runner: {
      entry: "maxProduct",
      comparison: "deep",
      jsStarter: `function maxProduct(level) {
  // Return the maximum product from splitting the tree on one edge.
  // TODO: implement
}`,
      jsReference: `function maxProduct(level) {
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
  const sums = [];
  function total(node) {
    if (!node) return 0;
    const s = node.val + total(node.left) + total(node.right);
    sums.push(s);
    return s;
  }
  const grand = total(root);
  let best = 0;
  for (const s of sums) best = Math.max(best, s * (grand - s));
  return best % 1000000007;
}`,
    },
    tests: [
      { name: "six nodes", args: [[1, 2, 3, 4, 5, 6]], expected: 110 },
      { name: "three nodes", args: [[1, 2, 3]], expected: 9 },
      { name: "two nodes", args: [[1, 1]], expected: 1 },
      { name: "single child", args: [[1]], expected: 0 },
    ],
    relatedIds: [543, 124],
  },

  {
    id: 988,
    slug: "smallest-string-starting-from-leaf",
    title: "Smallest String Starting From Leaf",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Backtracking", "String"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 43,
    leetcodeUrl: "https://leetcode.com/problems/smallest-string-starting-from-leaf/",
    description:
      "Each node holds a value from 0 to 25, mapping to letters 'a' through 'z'. Among all paths that read from a leaf up to the root, return the lexicographically smallest resulting string.",
    examples: [
      { input: "root = [0,1,2,3,4,3,4]", output: '"dba"' },
      { input: "root = [25,1,3,1,3,0,2]", output: '"adz"' },
    ],
    constraints: ["1 ≤ number of nodes ≤ 8500", "0 ≤ Node.val ≤ 25"],
    intuition:
      "Because the string is read leaf-to-root, prepend each node's letter as you descend so the path string is complete by the time you reach a leaf. Compare every leaf's string and keep the smallest one.",
    approach: [
      "DFS while carrying the suffix built from ancestors, prepending the current node's letter.",
      "When a leaf is reached, the assembled string is a full leaf-to-root candidate.",
      "Keep the lexicographically smallest candidate seen.",
      "Return that smallest string.",
    ],
    complexity: { time: "O(n · h)", space: "O(h)", note: "String comparisons cost up to the path length h." },
    solutions: [
      {
        language: "python",
        label: "DFS with prepend",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def smallest_from_leaf(root: TreeNode | None) -> str:
    best = None

    def dfs(node, suffix):
        nonlocal best
        if not node:
            return
        s = chr(97 + node.val) + suffix
        if not node.left and not node.right:
            if best is None or s < best:
                best = s
            return
        dfs(node.left, s)
        dfs(node.right, s)

    dfs(root, "")
    return best or ""`,
      },
      {
        language: "typescript",
        label: "DFS with prepend",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function smallestFromLeaf(root: TreeNode | null): string {
  let best: string | null = null;
  const dfs = (node: TreeNode | null, suffix: string) => {
    if (!node) return;
    const s = String.fromCharCode(97 + node.val) + suffix;
    if (!node.left && !node.right) {
      if (best === null || s < best) best = s;
      return;
    }
    dfs(node.left, s);
    dfs(node.right, s);
  };
  dfs(root, "");
  return best ?? "";
}`,
      },
    ],
    runner: {
      entry: "smallestFromLeaf",
      comparison: "deep",
      jsStarter: `function smallestFromLeaf(level) {
  // Return the lexicographically smallest leaf-to-root string.
  // TODO: implement
}`,
      jsReference: `function smallestFromLeaf(level) {
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
  let best = null;
  function dfs(node, suffix) {
    if (!node) return;
    const s = String.fromCharCode(97 + node.val) + suffix;
    if (!node.left && !node.right) {
      if (best === null || s < best) best = s;
      return;
    }
    dfs(node.left, s);
    dfs(node.right, s);
  }
  dfs(root, "");
  return best === null ? "" : best;
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[0, 1, 2, 3, 4, 3, 4]], expected: "dba" },
      { name: "z root", args: [[25, 1, 3, 1, 3, 0, 2]], expected: "adz" },
      { name: "single a", args: [[0]], expected: "a" },
      { name: "two leaves", args: [[2, 2, 1]], expected: "bc" },
    ],
    relatedIds: [129, 257],
  },

  {
    id: 1457,
    slug: "pseudo-palindromic-paths-in-a-binary-tree",
    title: "Pseudo-Palindromic Paths in a Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Bitmask"],
    companies: ["amazon", "microsoft", "google", "bytedance"],
    frequency: 50,
    leetcodeUrl: "https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/",
    description:
      "A root-to-leaf path is pseudo-palindromic if its node values can be rearranged into a palindrome. Count how many such paths the tree contains.",
    examples: [
      { input: "root = [2,3,1,3,1,null,1]", output: "2" },
      { input: "root = [1,1,1]", output: "2" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^5", "1 ≤ Node.val ≤ 9"],
    intuition:
      "A multiset can form a palindrome only if at most one value occurs an odd number of times. Since values are limited to 1–9, track parity with a 9-bit mask, flipping a bit per node; a path qualifies when its leaf mask has zero or one bit set.",
    approach: [
      "DFS while maintaining a bitmask whose i-th bit is the parity of value i along the path.",
      "Toggle the bit for the current node's value.",
      "At a leaf, the path is pseudo-palindromic when the mask has at most one set bit (`mask & (mask-1) == 0`).",
      "Sum the qualifying leaves.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "One mask carried down each path." },
    solutions: [
      {
        language: "python",
        label: "Parity bitmask",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def pseudo_palindromic_paths(root: TreeNode | None) -> int:
    count = 0

    def dfs(node, mask):
        nonlocal count
        if not node:
            return
        mask ^= 1 << node.val
        if not node.left and not node.right:
            if mask & (mask - 1) == 0:
                count += 1
            return
        dfs(node.left, mask)
        dfs(node.right, mask)

    dfs(root, 0)
    return count`,
      },
      {
        language: "typescript",
        label: "Parity bitmask",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pseudoPalindromicPaths(root: TreeNode | null): number {
  let count = 0;
  const dfs = (node: TreeNode | null, mask: number) => {
    if (!node) return;
    mask ^= 1 << node.val;
    if (!node.left && !node.right) {
      if ((mask & (mask - 1)) === 0) count++;
      return;
    }
    dfs(node.left, mask);
    dfs(node.right, mask);
  };
  dfs(root, 0);
  return count;
}`,
      },
    ],
    runner: {
      entry: "pseudoPalindromicPaths",
      comparison: "deep",
      jsStarter: `function pseudoPalindromicPaths(level) {
  // Count root-to-leaf paths whose values can form a palindrome.
  // TODO: implement
}`,
      jsReference: `function pseudoPalindromicPaths(level) {
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
  let count = 0;
  function dfs(node, mask) {
    if (!node) return;
    mask ^= 1 << node.val;
    if (!node.left && !node.right) {
      if ((mask & (mask - 1)) === 0) count++;
      return;
    }
    dfs(node.left, mask);
    dfs(node.right, mask);
  }
  dfs(root, 0);
  return count;
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[2, 3, 1, 3, 1, null, 1]], expected: 2 },
      { name: "single node", args: [[9]], expected: 1 },
      { name: "all ones", args: [[1, 1, 1]], expected: 2 },
      { name: "no palindrome", args: [[1, 2, 3]], expected: 0 },
    ],
    relatedIds: [1372, 257],
  },

  {
    id: 894,
    slug: "all-possible-full-binary-trees",
    title: "All Possible Full Binary Trees",
    difficulty: "Medium",
    category: "trees",
    patterns: ["Recursion", "Memoization", "Divide and Conquer"],
    companies: ["amazon", "google", "microsoft"],
    frequency: 47,
    leetcodeUrl: "https://leetcode.com/problems/all-possible-full-binary-trees/",
    description:
      "A full binary tree has every node owning either zero or two children. Given an integer `n`, build all full binary trees with exactly `n` nodes (each node valued 0) and return them as level-order arrays.",
    examples: [
      { input: "n = 1", output: "[[0]]" },
      { input: "n = 3", output: "[[0,0,0]]" },
    ],
    constraints: ["1 ≤ n ≤ 20"],
    intuition:
      "A full tree needs an odd node count, since the root plus two equal-parity subtrees always sums to odd. Split the remaining `n-1` nodes into a left subtree of size `l` and a right of size `n-1-l` (both odd), and combine every left shape with every right shape. Memoizing by size avoids recomputation.",
    approach: [
      "Return an empty list when n is even (no full tree exists).",
      "Base case n = 1 yields a single leaf.",
      "For odd l from 1 to n-1, recursively build left trees of size l and right trees of size n-1-l.",
      "Pair every left with every right under a new root, then serialize each.",
    ],
    complexity: { time: "O(Cₙ)", space: "O(Cₙ)", note: "Catalan-many shapes, built with memoization." },
    solutions: [
      {
        language: "python",
        label: "Memoized build",
        code: `from functools import lru_cache

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def all_possible_fbt(n: int) -> list[TreeNode | None]:
    @lru_cache(maxsize=None)
    def build(k: int) -> tuple:
        if k % 2 == 0:
            return tuple()
        if k == 1:
            return (TreeNode(0),)
        out = []
        for l in range(1, k, 2):
            for left in build(l):
                for right in build(k - 1 - l):
                    out.append(TreeNode(0, left, right))
        return tuple(out)
    return list(build(n))`,
      },
      {
        language: "typescript",
        label: "Memoized build",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function allPossibleFBT(n: number): (TreeNode | null)[] {
  const memo = new Map<number, (TreeNode | null)[]>();
  function build(k: number): (TreeNode | null)[] {
    if (k % 2 === 0) return [];
    if (k === 1) return [new TreeNode(0)];
    if (memo.has(k)) return memo.get(k)!;
    const out: (TreeNode | null)[] = [];
    for (let l = 1; l < k; l += 2) {
      for (const left of build(l)) {
        for (const right of build(k - 1 - l)) {
          out.push(new TreeNode(0, left, right));
        }
      }
    }
    memo.set(k, out);
    return out;
  }
  return build(n);
}`,
      },
    ],
    runner: {
      entry: "allPossibleFBT",
      comparison: "canonical",
      jsStarter: `function allPossibleFBT(n) {
  // Return every full binary tree of n nodes as a list of level-order arrays.
  // TODO: implement
}`,
      jsReference: `function allPossibleFBT(n) {
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  const memo = new Map();
  function build(k) {
    if (k % 2 === 0) return [];
    if (k === 1) return [{ val: 0, left: null, right: null }];
    if (memo.has(k)) return memo.get(k);
    const out = [];
    for (let l = 1; l < k; l += 2) {
      const lefts = build(l);
      const rights = build(k - 1 - l);
      for (const L of lefts) for (const R of rights) {
        out.push({ val: 0, left: L, right: R });
      }
    }
    memo.set(k, out);
    return out;
  }
  return build(n).map(serialize);
}`,
    },
    tests: [
      { name: "n=1", args: [1], expected: [[0]] },
      { name: "n=3", args: [3], expected: [[0, 0, 0]] },
      { name: "n=5", args: [5], expected: [[0, 0, 0, null, null, 0, 0], [0, 0, 0, 0, 0]] },
      { name: "even -> none", args: [2], expected: [] },
    ],
    relatedIds: [95, 96],
  },

  {
    id: 671,
    slug: "second-minimum-node-in-a-binary-tree",
    title: "Second Minimum Node In a Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "linkedin", "microsoft"],
    frequency: 41,
    leetcodeUrl: "https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/",
    description:
      "In this special tree every node has either zero or two children, and a parent's value is the minimum of its two children. So the root holds the smallest value overall. Return the second-smallest distinct value, or -1 if none exists.",
    examples: [
      { input: "root = [2,2,5,null,null,5,7]", output: "5" },
      { input: "root = [2,2,2]", output: "-1" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 25", "1 ≤ Node.val ≤ 2^31 - 1"],
    intuition:
      "The root already equals the global minimum, so the answer is simply the smallest value strictly greater than the root. Scan every node, ignore anything equal to the root, and track the smallest qualifying value; if none turns up, return -1.",
    approach: [
      "Record the root value as the known minimum.",
      "Traverse the whole tree.",
      "Track the smallest value that is strictly greater than the minimum.",
      "Return it, or -1 if no greater value was found.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single traversal." },
    solutions: [
      {
        language: "python",
        label: "Scan for second min",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def find_second_minimum_value(root: TreeNode) -> int:
    minimum = root.val
    second = float("inf")

    def dfs(node):
        nonlocal second
        if not node:
            return
        if minimum < node.val < second:
            second = node.val
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return second if second != float("inf") else -1`,
      },
      {
        language: "typescript",
        label: "Scan for second min",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function findSecondMinimumValue(root: TreeNode): number {
  const minimum = root.val;
  let second = Infinity;
  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    if (node.val > minimum && node.val < second) second = node.val;
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return second === Infinity ? -1 : second;
}`,
      },
    ],
    runner: {
      entry: "findSecondMinimumValue",
      comparison: "deep",
      jsStarter: `function findSecondMinimumValue(level) {
  // Return the second-smallest distinct value, or -1.
  // TODO: implement
}`,
      jsReference: `function findSecondMinimumValue(level) {
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
  const minimum = root.val;
  let second = Infinity;
  function dfs(node) {
    if (!node) return;
    if (node.val > minimum && node.val < second) second = node.val;
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return second === Infinity ? -1 : second;
}`,
    },
    tests: [
      { name: "has second", args: [[2, 2, 5, null, null, 5, 7]], expected: 5 },
      { name: "all equal", args: [[2, 2, 2]], expected: -1 },
      { name: "two values", args: [[5, 8, 5]], expected: 8 },
      { name: "single", args: [[1]], expected: -1 },
    ],
    relatedIds: [104, 230],
  },

  {
    id: 606,
    slug: "construct-string-from-binary-tree",
    title: "Construct String from Binary Tree",
    difficulty: "Easy",
    category: "trees",
    patterns: ["DFS", "Preorder", "String"],
    companies: ["amazon", "microsoft", "bloomberg"],
    frequency: 42,
    leetcodeUrl: "https://leetcode.com/problems/construct-string-from-binary-tree/",
    description:
      "Encode a binary tree as a preorder string where each subtree is wrapped in parentheses. Drop empty parentheses pairs that do not affect the one-to-one mapping back to the original tree — namely an empty right pair when the left is also empty, or any trailing empty pairs.",
    examples: [
      { input: "root = [1,2,3,4]", output: '"1(2(4))(3)"' },
      { input: "root = [1,2,3,null,4]", output: '"1(2()(4))(3)"' },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^4", "-1000 ≤ Node.val ≤ 1000"],
    intuition:
      "Preorder is the natural encoding: print the value, then the left subtree in parentheses, then the right. The only nuance is that an empty right child can be omitted, but an empty left must still print `()` whenever a right child follows, to keep the encoding reversible.",
    approach: [
      "Emit the node's value.",
      "If the node has any child, append the left subtree wrapped in parentheses (empty string for a null left).",
      "Append the right subtree in parentheses only when a right child exists.",
      "Recurse; an empty tree contributes the empty string.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Builds the string in preorder." },
    solutions: [
      {
        language: "python",
        label: "Preorder string",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def tree2str(root: TreeNode | None) -> str:
    if not root:
        return ""
    s = str(root.val)
    if root.left or root.right:
        s += "(" + tree2str(root.left) + ")"
        if root.right:
            s += "(" + tree2str(root.right) + ")"
    return s`,
      },
      {
        language: "typescript",
        label: "Preorder string",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function tree2str(root: TreeNode | null): string {
  if (!root) return "";
  let s = String(root.val);
  if (root.left || root.right) {
    s += "(" + tree2str(root.left) + ")";
    if (root.right) s += "(" + tree2str(root.right) + ")";
  }
  return s;
}`,
      },
    ],
    runner: {
      entry: "tree2str",
      comparison: "deep",
      jsStarter: `function tree2str(level) {
  // Return the parenthesized preorder encoding of the tree.
  // TODO: implement
}`,
      jsReference: `function tree2str(level) {
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
  function dfs(node) {
    if (!node) return "";
    let s = String(node.val);
    if (node.left || node.right) {
      s += "(" + dfs(node.left) + ")";
      if (node.right) s += "(" + dfs(node.right) + ")";
    }
    return s;
  }
  return dfs(build(level));
}`,
    },
    tests: [
      { name: "omit empty right", args: [[1, 2, 3, 4]], expected: "1(2(4))(3)" },
      { name: "keep empty left", args: [[1, 2, 3, null, 4]], expected: "1(2()(4))(3)" },
      { name: "single", args: [[1]], expected: "1" },
      { name: "left only", args: [[1, 2]], expected: "1(2)" },
    ],
    relatedIds: [536, 297],
  },

  {
    id: 1026,
    slug: "maximum-difference-between-node-and-ancestor",
    title: "Maximum Difference Between Node and Ancestor",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion"],
    companies: ["amazon", "microsoft", "google"],
    frequency: 49,
    leetcodeUrl: "https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/",
    description:
      "Across all pairs where one node is an ancestor of the other, return the largest absolute difference between their values.",
    examples: [
      { input: "root = [8,3,10,1,6,null,14,null,null,4,7,13]", output: "7" },
      { input: "root = [1,null,2,null,0,3]", output: "3" },
    ],
    constraints: ["2 ≤ number of nodes ≤ 5000", "0 ≤ Node.val ≤ 10^5"],
    intuition:
      "The biggest gap on any root-to-leaf path is the path's maximum value minus its minimum value, and any ancestor pair lies on some such path. Carry the running min and max down each path; when you fall off a leaf, `max - min` is a candidate answer.",
    approach: [
      "DFS carrying the minimum and maximum values seen from the root to the current node.",
      "Update both extremes with the current node's value.",
      "On reaching a null child, compare max - min against the best so far.",
      "Return the overall best difference.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "One value pair per recursion frame." },
    solutions: [
      {
        language: "python",
        label: "Track min/max on path",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_ancestor_diff(root: TreeNode) -> int:
    best = 0

    def dfs(node, lo, hi):
        nonlocal best
        if not node:
            best = max(best, hi - lo)
            return
        lo = min(lo, node.val)
        hi = max(hi, node.val)
        dfs(node.left, lo, hi)
        dfs(node.right, lo, hi)

    dfs(root, root.val, root.val)
    return best`,
      },
      {
        language: "typescript",
        label: "Track min/max on path",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxAncestorDiff(root: TreeNode): number {
  let best = 0;
  const dfs = (node: TreeNode | null, lo: number, hi: number) => {
    if (!node) {
      best = Math.max(best, hi - lo);
      return;
    }
    lo = Math.min(lo, node.val);
    hi = Math.max(hi, node.val);
    dfs(node.left, lo, hi);
    dfs(node.right, lo, hi);
  };
  dfs(root, root.val, root.val);
  return best;
}`,
      },
    ],
    runner: {
      entry: "maxAncestorDiff",
      comparison: "deep",
      jsStarter: `function maxAncestorDiff(level) {
  // Return the largest |ancestor - descendant| value difference.
  // TODO: implement
}`,
      jsReference: `function maxAncestorDiff(level) {
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
  let best = 0;
  function dfs(node, lo, hi) {
    if (!node) { best = Math.max(best, hi - lo); return; }
    lo = Math.min(lo, node.val);
    hi = Math.max(hi, node.val);
    dfs(node.left, lo, hi);
    dfs(node.right, lo, hi);
  }
  dfs(root, root.val, root.val);
  return best;
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]], expected: 7 },
      { name: "right chain", args: [[1, null, 2, null, 0, 3]], expected: 3 },
      { name: "short chain", args: [[2, null, 0, 1]], expected: 2 },
      { name: "single", args: [[5]], expected: 0 },
    ],
    relatedIds: [543, 124],
  },

  {
    id: 1123,
    slug: "lowest-common-ancestor-of-deepest-leaves",
    title: "Lowest Common Ancestor of Deepest Leaves",
    difficulty: "Medium",
    category: "trees",
    patterns: ["DFS", "Recursion", "Tree DP"],
    companies: ["amazon", "google", "meta", "microsoft"],
    frequency: 53,
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/",
    description:
      "Find the deepest leaves of the tree and return the smallest subtree that contains all of them — given as the level-order array of the subtree rooted at that lowest common ancestor.",
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4]", output: "[2,7,4]" },
      { input: "root = [1]", output: "[1]" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 1000", "Values are distinct."],
    intuition:
      "Have each node report the depth of its deepest leaf and the LCA within its own subtree. If both children reach the same depth, this node is the meeting point; otherwise the answer comes from the deeper child. The root's report gives the global LCA.",
    approach: [
      "DFS returning (subtree depth, candidate LCA) for each node.",
      "When the left and right depths tie, the current node is the LCA of its deepest leaves.",
      "Otherwise propagate the LCA from the deeper side.",
      "Serialize the subtree rooted at the root's reported LCA.",
    ],
    complexity: { time: "O(n)", space: "O(h)", note: "Single post-order pass." },
    solutions: [
      {
        language: "python",
        label: "Depth + LCA pass",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def lca_deepest_leaves(root: TreeNode | None) -> TreeNode | None:
    def dfs(node):
        if not node:
            return 0, None
        ld, ln = dfs(node.left)
        rd, rn = dfs(node.right)
        if ld == rd:
            return ld + 1, node
        return (ld + 1, ln) if ld > rd else (rd + 1, rn)
    return dfs(root)[1]`,
      },
      {
        language: "typescript",
        label: "Depth + LCA pass",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null): [number, TreeNode | null] => {
    if (!node) return [0, null];
    const [ld, ln] = dfs(node.left);
    const [rd, rn] = dfs(node.right);
    if (ld === rd) return [ld + 1, node];
    return ld > rd ? [ld + 1, ln] : [rd + 1, rn];
  };
  return dfs(root)[1];
}`,
      },
    ],
    runner: {
      entry: "lcaDeepestLeaves",
      comparison: "deep",
      jsStarter: `function lcaDeepestLeaves(level) {
  // Return the subtree (level-order array) rooted at the LCA of the deepest leaves.
  // TODO: implement
}`,
      jsReference: `function lcaDeepestLeaves(level) {
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
  function serialize(root) {
    if (!root) return [];
    const out = [];
    const q = [root];
    while (q.length) {
      const node = q.shift();
      if (node === null) { out.push(null); continue; }
      out.push(node.val);
      q.push(node.left);
      q.push(node.right);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  }
  const root = build(level);
  function dfs(node) {
    if (!node) return [0, null];
    const L = dfs(node.left);
    const R = dfs(node.right);
    if (L[0] === R[0]) return [L[0] + 1, node];
    return L[0] > R[0] ? [L[0] + 1, L[1]] : [R[0] + 1, R[1]];
  }
  return serialize(dfs(root)[1]);
}`,
    },
    tests: [
      { name: "leetcode sample", args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]], expected: [2, 7, 4] },
      { name: "single", args: [[1]], expected: [1] },
      { name: "one deepest", args: [[0, 1, 3, null, 2]], expected: [2] },
      { name: "left chain leaf", args: [[1, 2, 3, 4]], expected: [4] },
    ],
    relatedIds: [236, 865],
  },

  {
    id: 1161,
    slug: "maximum-level-sum-of-a-binary-tree",
    title: "Maximum Level Sum of a Binary Tree",
    difficulty: "Medium",
    category: "trees",
    patterns: ["BFS", "Level Order"],
    companies: ["amazon", "microsoft", "linkedin"],
    frequency: 46,
    leetcodeUrl: "https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/",
    description:
      "Levels are numbered starting at 1 for the root. Return the smallest level number whose node values add up to the maximum level sum.",
    examples: [
      { input: "root = [1,7,0,7,-8,null,null]", output: "2", explanation: "Level 2 sums to 7 + 0 = 7, the largest." },
      { input: "root = [1,2,3,4,5,6,7]", output: "3" },
    ],
    constraints: ["1 ≤ number of nodes ≤ 10^4", "-10^5 ≤ Node.val ≤ 10^5"],
    intuition:
      "Sum each level during a breadth-first traversal and remember the level with the largest total. Because levels are visited in increasing order and ties favor the earlier level, a strict greater-than comparison naturally keeps the smallest qualifying level.",
    approach: [
      "BFS level by level, numbering levels from 1.",
      "Add up all values on the current level.",
      "Update the answer only when a strictly larger sum appears.",
      "Return the recorded level number.",
    ],
    complexity: { time: "O(n)", space: "O(n)", note: "Queue holds one level." },
    solutions: [
      {
        language: "python",
        label: "Level-order BFS",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def max_level_sum(root: TreeNode | None) -> int:
    best = float("-inf")
    ans = 1
    level = [root]
    depth = 0
    while level:
        depth += 1
        total = sum(node.val for node in level)
        if total > best:
            best = total
            ans = depth
        nxt: list[TreeNode] = []
        for node in level:
            if node.left:
                nxt.append(node.left)
            if node.right:
                nxt.append(node.right)
        level = nxt
    return ans`,
      },
      {
        language: "typescript",
        label: "Level-order BFS",
        code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxLevelSum(root: TreeNode): number {
  let best = -Infinity;
  let ans = 1;
  let level: TreeNode[] = [root];
  let depth = 0;
  while (level.length) {
    depth++;
    let total = 0;
    const next: TreeNode[] = [];
    for (const node of level) {
      total += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    if (total > best) {
      best = total;
      ans = depth;
    }
    level = next;
  }
  return ans;
}`,
      },
    ],
    runner: {
      entry: "maxLevelSum",
      comparison: "deep",
      jsStarter: `function maxLevelSum(level) {
  // Return the 1-indexed level with the maximum sum.
  // TODO: implement
}`,
      jsReference: `function maxLevelSum(level) {
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
  let best = -Infinity;
  let ans = 1;
  let cur = [root];
  let depth = 0;
  while (cur.length) {
    depth++;
    let total = 0;
    const next = [];
    for (const node of cur) {
      total += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    if (total > best) { best = total; ans = depth; }
    cur = next;
  }
  return ans;
}`,
    },
    tests: [
      { name: "second level", args: [[1, 7, 0, 7, -8, null, null]], expected: 2 },
      { name: "single", args: [[1]], expected: 1 },
      { name: "all negative", args: [[-1, -2, -3]], expected: 1 },
      { name: "deepest wins", args: [[1, 2, 3, 4, 5, 6, 7]], expected: 3 },
    ],
    relatedIds: [515, 102],
  },
];

export default batchO;
