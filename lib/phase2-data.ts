export type GoalId = "swe-intern" | "apm-intern";
export type NodeStatus = "locked" | "available" | "complete";

export type SkillNodeDefinition = {
  id: string;
  goalId: GoalId;
  title: string;
  eyebrow: string;
  description: string;
  rule: string;
  resources: string[];
  estimatedHours: number;
  parentIds: string[];
  position: { x: number; y: number };
};

export const phase2Goals: Array<{ id: GoalId; title: string; description: string; deadlineHint: string }> = [
  { id: "swe-intern", title: "Software engineer intern", description: "Build the foundations, proof, and interview rhythm for a strong SWE internship application.", deadlineHint: "A focused 16–24 week path" },
  { id: "apm-intern", title: "APM / PM intern", description: "Practice product thinking, analytics, communication, and shipped decision-making.", deadlineHint: "A focused 12–20 week path" }
];

export const phase2Nodes: SkillNodeDefinition[] = [
  { id: "swe-python", goalId: "swe-intern", title: "Programming fluency", eyebrow: "Foundation", description: "Write small, readable programs and debug them without guessing.", rule: "Mark complete after one language refresher and three small programs.", resources: ["CS50x", "Python docs"], estimatedHours: 12, parentIds: [], position: { x: 0, y: 120 } },
  { id: "swe-complexity", goalId: "swe-intern", title: "Complexity", eyebrow: "Foundation", description: "Know what your code costs before you optimise it.", rule: "Mark complete after explaining time and space complexity for ten solutions.", resources: ["Big-O cheat sheet", "VisuAlgo"], estimatedHours: 8, parentIds: ["swe-python"], position: { x: 260, y: 20 } },
  { id: "swe-arrays", goalId: "swe-intern", title: "Arrays & strings", eyebrow: "DSA", description: "Build a reliable pattern library for the problems you see most often.", rule: "Mark complete after 15 solved problems tagged array or string.", resources: ["NeetCode 150", "LeetCode patterns"], estimatedHours: 24, parentIds: ["swe-python", "swe-complexity"], position: { x: 260, y: 220 } },
  { id: "swe-hashmaps", goalId: "swe-intern", title: "Hash maps", eyebrow: "DSA", description: "Trade memory for fast lookup when the problem calls for it.", rule: "Mark complete after ten solved problems using a map or set.", resources: ["NeetCode 150", "Python collections"], estimatedHours: 18, parentIds: ["swe-arrays"], position: { x: 520, y: 100 } },
  { id: "swe-trees", goalId: "swe-intern", title: "Trees", eyebrow: "DSA", description: "Traverse, reason about, and communicate recursive structures.", rule: "Mark complete after ten solved tree problems and one verbal walkthrough.", resources: ["Binary tree guide", "VisuAlgo trees"], estimatedHours: 22, parentIds: ["swe-hashmaps"], position: { x: 780, y: 20 } },
  { id: "swe-graphs", goalId: "swe-intern", title: "Graphs", eyebrow: "DSA", description: "Move from local choices to connected systems with BFS, DFS, and shortest paths.", rule: "Mark complete after ten solved graph problems and one diagrammed explanation.", resources: ["Graph algorithms", "CP-Algorithms"], estimatedHours: 26, parentIds: ["swe-hashmaps"], position: { x: 780, y: 230 } },
  { id: "swe-systems", goalId: "swe-intern", title: "CS foundations", eyebrow: "Foundations", description: "Understand the systems behind the interfaces you build.", rule: "Mark complete after covering SQL, networking, OS, and OOP notes.", resources: ["Missing Semester", "SQLBolt"], estimatedHours: 30, parentIds: ["swe-trees", "swe-graphs"], position: { x: 1040, y: 120 } },
  { id: "swe-project", goalId: "swe-intern", title: "Proof of work", eyebrow: "Projects", description: "Ship a project that makes your technical choices easy to see.", rule: "Mark complete after one deployed project with a clear README.", resources: ["README guide", "Vercel"], estimatedHours: 28, parentIds: ["swe-arrays"], position: { x: 520, y: 340 } },
  { id: "swe-interviews", goalId: "swe-intern", title: "Mock interviews", eyebrow: "Practice", description: "Turn knowledge into calm, structured communication under time pressure.", rule: "Mark complete after three mock interviews and written reflections.", resources: ["Pramp", "Interviewing.io"], estimatedHours: 12, parentIds: ["swe-systems", "swe-project"], position: { x: 1300, y: 120 } },
  { id: "swe-applications", goalId: "swe-intern", title: "Applications", eyebrow: "Launch", description: "Build a focused application loop instead of sending into the void.", rule: "Mark complete after ten targeted applications and one resume review.", resources: ["Resume guide", "Company tracker"], estimatedHours: 10, parentIds: ["swe-interviews"], position: { x: 1560, y: 120 } },
  { id: "apm-research", goalId: "apm-intern", title: "User problems", eyebrow: "Foundation", description: "Notice who has a problem, what it costs them, and what evidence you have.", rule: "Mark complete after five structured user or product observations.", resources: ["JTBD primer", "Google UX course"], estimatedHours: 14, parentIds: [], position: { x: 0, y: 120 } },
  { id: "apm-sense", goalId: "apm-intern", title: "Product sense", eyebrow: "Thinking", description: "Make product trade-offs with a clear point of view.", rule: "Mark complete after three product teardowns with explicit trade-offs.", resources: ["Decode and Conquer", "Product essays"], estimatedHours: 20, parentIds: ["apm-research"], position: { x: 300, y: 20 } },
  { id: "apm-analytics", goalId: "apm-intern", title: "Metrics", eyebrow: "Analytics", description: "Choose signals that tell you whether a product is helping.", rule: "Mark complete after defining a funnel and five useful metrics.", resources: ["Analytics academy", "SQLBolt"], estimatedHours: 18, parentIds: ["apm-research"], position: { x: 300, y: 220 } },
  { id: "apm-writing", goalId: "apm-intern", title: "Product writing", eyebrow: "Communication", description: "Explain a problem, decision, and next step so a team can act.", rule: "Mark complete after three one-page product briefs.", resources: ["Good product writing", "Narrative docs"], estimatedHours: 16, parentIds: ["apm-sense"], position: { x: 620, y: 20 } },
  { id: "apm-prototype", goalId: "apm-intern", title: "Product proof", eyebrow: "Proof", description: "Make an idea tangible through a prototype, launch, or experiment.", rule: "Mark complete after shipping one small product experiment.", resources: ["Figma", "No-code prototyping"], estimatedHours: 24, parentIds: ["apm-sense", "apm-analytics"], position: { x: 620, y: 220 } },
  { id: "apm-cases", goalId: "apm-intern", title: "Case practice", eyebrow: "Practice", description: "Structure product cases without losing the user behind the framework.", rule: "Mark complete after five timed product cases and reflections.", resources: ["Product case bank", "Mock practice"], estimatedHours: 20, parentIds: ["apm-writing", "apm-prototype"], position: { x: 960, y: 120 } },
  { id: "apm-applications", goalId: "apm-intern", title: "Applications", eyebrow: "Launch", description: "Build a targeted application loop that reflects your product proof.", rule: "Mark complete after ten targeted applications and one resume review.", resources: ["APM company list", "Resume guide"], estimatedHours: 10, parentIds: ["apm-cases"], position: { x: 1280, y: 120 } }
];

export function nodesForGoal(goalId: GoalId) { return phase2Nodes.filter((node) => node.goalId === goalId); }
export function goalById(goalId: GoalId) { return phase2Goals.find((goal) => goal.id === goalId) ?? phase2Goals[0]; }
