import { CalendarDays, Check, Pencil, Trash2 } from 'lucide-react'
import { formatTaskDate } from '../utils/dateUtils'
import type { Task } from '../types/task';

const priorityStyle = {
  High: 'bg-rose-50 text-rose-600',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-emerald-50 text-emerald-700',
}

export default function TaskCard({ task, onToggle, onEdit, onDelete, compact = false }: { task: Task; onToggle: (task: Task) => void; onEdit: (task: Task) => void; onDelete: (task: Task) => void; compact?: boolean }) {
  const done = task.status === 'Completed'
  return (
    <article className="group flex items-center gap-3 border-b border-slate-100 py-3 last:border-0">
      <button onClick={() => onToggle(task)} aria-label={done ? 'Mark in progress' : 'Mark completed'} className={`grid h-[19px] w-[19px] shrink-0 place-items-center rounded-[4px] border transition ${done ? 'border-[#4964ed] bg-[#4964ed] text-white' : 'border-slate-300 bg-white hover:border-[#4964ed]'}`}>
        {done && <Check size={13} strokeWidth={3}/>}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[13px] font-semibold ${done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
        {!compact && <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-slate-400"><CalendarDays size={11}/>{formatTaskDate(task.dueDate)}</span>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${priorityStyle[task.priority] || priorityStyle.Medium}`}>{task.priority}</span>
        </div>}
      </div>
      <div className="flex items-center gap-1 opacity-100 transition sm:opacity-60 sm:group-hover:opacity-100">
        <button onClick={() => onEdit(task)} aria-label="Edit task" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-[#4964ed]"><Pencil size={15}/></button>
        <button onClick={() => onDelete(task)} aria-label="Delete task" className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"><Trash2 size={15}/></button>
      </div>
    </article>
  )
}
