// DSA practice sheet data.
// To add a problem: copy any object in `dsaProblems`, give it a unique `id`,
// and pick `pattern`, `difficulty` and `companies` from the types below.

import type { CompanyTag } from "./companies";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type DsaPattern =
  | "Arrays"
  | "Strings"
  | "Hashing"
  | "Two Pointers"
  | "Sliding Window"
  | "Stack"
  | "Linked List"
  | "Trees"
  | "Graphs"
  | "Dynamic Programming"
  | "Binary Search";

export const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

export const dsaPatterns: { name: DsaPattern; idea: string }[] = [
  { name: "Arrays", idea: "Prefix sums, running max/min and one-pass thinking like Kadane's." },
  { name: "Strings", idea: "Character counts, reversal and index-based substring handling." },
  { name: "Hashing", idea: "Use a HashMap/HashSet to turn O(n²) into O(n)." },
  { name: "Two Pointers", idea: "Pointers moving inward from both ends, usually on sorted data." },
  { name: "Sliding Window", idea: "A fixed or variable window over a contiguous subarray or substring." },
  { name: "Stack", idea: "Brackets, next greater element and 'remember the previous one' problems." },
  { name: "Linked List", idea: "Slow-fast pointers, dummy nodes and pointer reversal." },
  { name: "Trees", idea: "DFS (recursion) and BFS (queue). Master traversals first." },
  { name: "Graphs", idea: "BFS/DFS on grids or nodes, a visited array and topological sort." },
  { name: "Dynamic Programming", idea: "Recursion + memo, then a bottom-up table. Define the state first." },
  { name: "Binary Search", idea: "Halve a sorted search space. It also works on the answer itself." },
];

export interface DsaProblem {
  id: string;
  name: string;
  pattern: DsaPattern;
  difficulty: Difficulty;
  companies: CompanyTag[];
  /** One line: why it matters */
  why: string;
  /** Practice link (LeetCode). Optional. */
  url?: string;
}

const lc = (slug: string) => `https://leetcode.com/problems/${slug}/`;

export const dsaProblems: DsaProblem[] = [
  // Arrays
  { id: "two-sum", name: "Two Sum", pattern: "Arrays", difficulty: "Easy", companies: ["TCS", "Infosys", "Wipro", "Amazon"], why: "The journey from brute force to HashMap. The most common interview warm-up.", url: lc("two-sum") },
  { id: "best-time-stock", name: "Best Time to Buy and Sell Stock", pattern: "Arrays", difficulty: "Easy", companies: ["TCS", "Accenture", "Amazon"], why: "Track a running minimum and solve it in one pass.", url: lc("best-time-to-buy-and-sell-stock") },
  { id: "kadane", name: "Maximum Subarray (Kadane's Algorithm)", pattern: "Arrays", difficulty: "Medium", companies: ["TCS", "Infosys", "Capgemini", "Amazon"], why: "Asked every season. The simplest form of DP.", url: lc("maximum-subarray") },
  { id: "product-except-self", name: "Product of Array Except Self", pattern: "Arrays", difficulty: "Medium", companies: ["Amazon"], why: "Prefix and suffix products. Teaches you to think without division.", url: lc("product-of-array-except-self") },

  // Two Pointers
  { id: "move-zeroes", name: "Move Zeroes", pattern: "Two Pointers", difficulty: "Easy", companies: ["TCS", "Wipro", "Capgemini"], why: "In-place array updates. A service-company coding round favourite.", url: lc("move-zeroes") },
  { id: "valid-palindrome", name: "Valid Palindrome", pattern: "Two Pointers", difficulty: "Easy", companies: ["TCS", "Infosys", "Accenture"], why: "Compare from both ends: strings and two pointers together.", url: lc("valid-palindrome") },
  { id: "container-water", name: "Container With Most Water", pattern: "Two Pointers", difficulty: "Medium", companies: ["Amazon", "Infosys"], why: "Which pointer to move? You must explain the greedy reasoning.", url: lc("container-with-most-water") },
  { id: "three-sum", name: "3Sum", pattern: "Two Pointers", difficulty: "Medium", companies: ["Amazon"], why: "Sort + two pointers + duplicate handling. Common in product interviews.", url: lc("3sum") },
  { id: "trapping-rain-water", name: "Trapping Rain Water", pattern: "Two Pointers", difficulty: "Hard", companies: ["Amazon"], why: "The left-max / right-max classic. Builds Hard-level confidence.", url: lc("trapping-rain-water") },

  // Strings
  { id: "valid-anagram", name: "Valid Anagram", pattern: "Strings", difficulty: "Easy", companies: ["TCS", "Wipro", "Accenture", "Capgemini"], why: "Character frequency counting with a size-26 array.", url: lc("valid-anagram") },
  { id: "longest-common-prefix", name: "Longest Common Prefix", pattern: "Strings", difficulty: "Easy", companies: ["TCS", "Infosys"], why: "String comparison basics. Appears directly in online tests.", url: lc("longest-common-prefix") },
  { id: "longest-substring", name: "Longest Substring Without Repeating Characters", pattern: "Strings", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "Your entry to sliding window: grow and shrink a window with a set/map.", url: lc("longest-substring-without-repeating-characters") },
  { id: "reverse-words", name: "Reverse Words in a String", pattern: "Strings", difficulty: "Medium", companies: ["TCS", "Wipro", "Capgemini"], why: "Split, trim and reverse. Tests how you handle extra spaces.", url: lc("reverse-words-in-a-string") },

  // Hashing
  { id: "contains-duplicate", name: "Contains Duplicate", pattern: "Hashing", difficulty: "Easy", companies: ["TCS", "Accenture", "Capgemini"], why: "The most direct use of a HashSet. A two-minute question.", url: lc("contains-duplicate") },
  { id: "group-anagrams", name: "Group Anagrams", pattern: "Hashing", difficulty: "Medium", companies: ["Amazon", "Infosys"], why: "What should the map key be: a sorted string or a count signature?", url: lc("group-anagrams") },
  { id: "top-k-frequent", name: "Top K Frequent Elements", pattern: "Hashing", difficulty: "Medium", companies: ["Amazon"], why: "Frequency map + heap or bucket sort. A common follow-up.", url: lc("top-k-frequent-elements") },

  // Sliding Window
  { id: "max-average-subarray", name: "Maximum Average Subarray I", pattern: "Sliding Window", difficulty: "Easy", companies: ["TCS", "Wipro"], why: "A fixed-size window. The first step into sliding window.", url: lc("maximum-average-subarray-i") },
  { id: "min-size-subarray", name: "Minimum Size Subarray Sum", pattern: "Sliding Window", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "A variable window: when to expand and when to shrink.", url: lc("minimum-size-subarray-sum") },
  { id: "permutation-in-string", name: "Permutation in String", pattern: "Sliding Window", difficulty: "Medium", companies: ["Amazon"], why: "Window + frequency match. The next level of anagrams.", url: lc("permutation-in-string") },

  // Stack
  { id: "valid-parentheses", name: "Valid Parentheses", pattern: "Stack", difficulty: "Easy", companies: ["TCS", "Infosys", "Wipro", "Accenture", "Amazon"], why: "The number one stack question. Shows up at almost every company.", url: lc("valid-parentheses") },
  { id: "min-stack", name: "Min Stack", pattern: "Stack", difficulty: "Medium", companies: ["Amazon", "Capgemini"], why: "A design question: how do you keep the minimum in O(1)?", url: lc("min-stack") },
  { id: "daily-temperatures", name: "Daily Temperatures", pattern: "Stack", difficulty: "Medium", companies: ["Amazon"], why: "Monotonic stack: the next greater element pattern.", url: lc("daily-temperatures") },

  // Linked List
  { id: "reverse-linked-list", name: "Reverse a Linked List", pattern: "Linked List", difficulty: "Easy", companies: ["TCS", "Infosys", "Wipro", "Capgemini", "Amazon"], why: "Pointer reversal. Know both the iterative and recursive versions.", url: lc("reverse-linked-list") },
  { id: "detect-cycle", name: "Detect Cycle in a Linked List", pattern: "Linked List", difficulty: "Easy", companies: ["Infosys", "Accenture", "Amazon"], why: "Floyd's slow-fast pointers. Also asked in viva rounds.", url: lc("linked-list-cycle") },
  { id: "merge-two-sorted", name: "Merge Two Sorted Lists", pattern: "Linked List", difficulty: "Easy", companies: ["TCS", "Wipro", "Amazon"], why: "The dummy node technique. The foundation of merge sort.", url: lc("merge-two-sorted-lists") },
  { id: "middle-linked-list", name: "Middle of the Linked List", pattern: "Linked List", difficulty: "Easy", companies: ["TCS", "Capgemini", "Accenture"], why: "Find the middle in one pass. The simplest slow-fast use.", url: lc("middle-of-the-linked-list") },
  { id: "merge-k-sorted", name: "Merge k Sorted Lists", pattern: "Linked List", difficulty: "Hard", companies: ["Amazon"], why: "Heap + linked list. A product-company favourite Hard.", url: lc("merge-k-sorted-lists") },

  // Trees
  { id: "max-depth-tree", name: "Maximum Depth of Binary Tree", pattern: "Trees", difficulty: "Easy", companies: ["Infosys", "Capgemini", "Amazon"], why: "Your first recursive tree question. Learn the base case.", url: lc("maximum-depth-of-binary-tree") },
  { id: "invert-tree", name: "Invert Binary Tree", pattern: "Trees", difficulty: "Easy", companies: ["Accenture", "Amazon"], why: "Swap left and right. Builds recursion confidence.", url: lc("invert-binary-tree") },
  { id: "level-order", name: "Binary Tree Level Order Traversal", pattern: "Trees", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "BFS with a queue. The template for many tree problems.", url: lc("binary-tree-level-order-traversal") },
  { id: "lca-bst", name: "Lowest Common Ancestor of a BST", pattern: "Trees", difficulty: "Medium", companies: ["Amazon"], why: "Use the BST property to decide: go left or right.", url: lc("lowest-common-ancestor-of-a-binary-search-tree") },

  // Graphs
  { id: "flood-fill", name: "Flood Fill", pattern: "Graphs", difficulty: "Easy", companies: ["Infosys", "Amazon"], why: "DFS on a grid. The easiest door into graphs.", url: lc("flood-fill") },
  { id: "number-of-islands", name: "Number of Islands", pattern: "Graphs", difficulty: "Medium", companies: ["Amazon", "Infosys"], why: "Connected components. Very common at product companies.", url: lc("number-of-islands") },
  { id: "rotting-oranges", name: "Rotting Oranges", pattern: "Graphs", difficulty: "Medium", companies: ["Amazon"], why: "Multi-source BFS: counting time as levels.", url: lc("rotting-oranges") },
  { id: "course-schedule", name: "Course Schedule", pattern: "Graphs", difficulty: "Medium", companies: ["Amazon"], why: "Cycle detection + topological sort. Directed graph basics.", url: lc("course-schedule") },

  // Dynamic Programming
  { id: "climbing-stairs", name: "Climbing Stairs", pattern: "Dynamic Programming", difficulty: "Easy", companies: ["TCS", "Infosys", "Accenture", "Amazon"], why: "Fibonacci-style DP. Go from recursion to a table.", url: lc("climbing-stairs") },
  { id: "house-robber", name: "House Robber", pattern: "Dynamic Programming", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "Pick / not-pick DP. Many later problems build on this.", url: lc("house-robber") },
  { id: "coin-change", name: "Coin Change", pattern: "Dynamic Programming", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "A form of unbounded knapsack: find the minimum coins.", url: lc("coin-change") },
  { id: "lis", name: "Longest Increasing Subsequence", pattern: "Dynamic Programming", difficulty: "Medium", companies: ["Amazon"], why: "O(n²) DP with an O(n log n) follow-up. Know both.", url: lc("longest-increasing-subsequence") },

  // Binary Search
  { id: "binary-search", name: "Binary Search", pattern: "Binary Search", difficulty: "Easy", companies: ["TCS", "Wipro", "Capgemini", "Accenture"], why: "low, high, mid. Boundary mistakes happen most here.", url: lc("binary-search") },
  { id: "search-rotated", name: "Search in Rotated Sorted Array", pattern: "Binary Search", difficulty: "Medium", companies: ["Infosys", "Amazon"], why: "Spotting which half is sorted is the whole problem.", url: lc("search-in-rotated-sorted-array") },
  { id: "min-rotated", name: "Find Minimum in Rotated Sorted Array", pattern: "Binary Search", difficulty: "Medium", companies: ["Amazon"], why: "Find the rotation point. Companion to the problem above.", url: lc("find-minimum-in-rotated-sorted-array") },
  { id: "koko-bananas", name: "Koko Eating Bananas", pattern: "Binary Search", difficulty: "Medium", companies: ["Amazon"], why: "Binary search on the answer. A new way of thinking.", url: lc("koko-eating-bananas") },
];

export const saathiMethod: { title: string; detail: string }[] = [
  { title: "Learn the pattern first", detail: "Read the pattern idea for 5 minutes, then solve the problems in that pattern." },
  { title: "Start with brute force", detail: "Write whatever works first, state its time complexity, then move towards the optimal solution." },
  { title: "Solve out loud", detail: "Interviews expect you to explain your thinking. Say your approach out loud while you practise." },
  { title: "Star it, then revise", detail: "If a problem takes more than 30 minutes, study the solution and star it. Redo only starred problems at the end of the week." },
];
