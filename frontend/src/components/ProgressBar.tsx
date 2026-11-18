export default function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const percent = total ? Math.round((completed / total) * 100) : 0
  return <div>
    <div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-bold text-slate-900">Weekly Progress</h2><span className="text-xs font-semibold text-[#4964ed]">{percent}%</span></div>
    <div className="h-3 overflow-hidden rounded-full bg-[#dfe4ff]"><div className="h-full rounded-full bg-[#263f9f] transition-all duration-300" style={{ width: `${percent}%` }}/></div>
  </div>
}
