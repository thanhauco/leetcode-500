import type { Difficulty } from "@/data";

const STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Hard: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`chip border ${STYLES[difficulty]}`}>{difficulty}</span>
  );
}
