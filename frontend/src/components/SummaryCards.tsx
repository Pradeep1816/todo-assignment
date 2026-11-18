import { CheckSquare, Clock3 } from 'lucide-react'

export default function SummaryCards({ completed, open }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-[#eef1ff] p-4">
        <div className="flex items-center gap-2 text-[#4964ed]"><CheckSquare size={17}/><span className="text-xs font-semibold text-slate-600">Task Complete</span></div>
        <div className="mt-2 flex items-baseline gap-2"><strong className="text-3xl font-extrabold text-slate-900">{String(completed).padStart(2, '0')}</strong><span className="text-[10px] text-slate-400">this week</span></div>
      </div>
      <div className="rounded-2xl bg-[#fff0f1] p-4">
        <div className="flex items-center gap-2 text-rose-500"><Clock3 size={17}/><span className="text-xs font-semibold text-slate-600">Task Pending</span></div>
        <div className="mt-2 flex items-baseline gap-2"><strong className="text-3xl font-extrabold text-slate-900">{String(open).padStart(2, '0')}</strong><span className="text-[10px] text-slate-400">this week</span></div>
      </div>
    </div>
  )
}
