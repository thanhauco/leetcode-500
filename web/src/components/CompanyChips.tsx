import { companyBySlug } from "@/data";

export default function CompanyChips({
  companies,
  max = 6,
}: {
  companies: string[];
  max?: number;
}) {
  const shown = companies.slice(0, max);
  const extra = companies.length - shown.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((slug) => {
        const company = companyBySlug[slug];
        const name = company?.name ?? slug;
        const color = company?.color ?? "#64748b";
        return (
          <span
            key={slug}
            className="chip border"
            style={{
              borderColor: `${color}66`,
              backgroundColor: `${color}1f`,
              color: "#e2e8f0",
            }}
          >
            {name}
          </span>
        );
      })}
      {extra > 0 && <span className="chip border border-white/10 bg-white/5 text-slate-400">+{extra}</span>}
    </div>
  );
}
