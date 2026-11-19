import { ChevronDown, ChevronUp } from 'lucide-react'
import TaskCard from './TaskCard'
import type { Task } from '../types/task'
import { formatWeek } from '../utils/dateUtils'

interface WeekSectionProps {
  week: Date,
  tasks: Task[],
  expanded: boolean,
  onExpand: () => void,
  onToggle: (task: Task) => void,
  onEdit: (task: Task) => void,
  onDelete: (task: Task) => void

}

export default function WeekSection({
  week,
  tasks, 
  expanded, 
  onExpand, 
  ...actions }: WeekSectionProps) {

  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const open = tasks.length - completed

  return <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
    <button onClick={onExpand} className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50">
      <div><p className="text-sm font-bold text-slate-900">{formatWeek(week)}</p><p className="mt-1 text-[11px] text-slate-400">{tasks.length} tasks · <span className="text-emerald-600">{completed} completed</span> · <span className="text-amber-600">{open} open</span></p></div>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-50 text-slate-500">{expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span>
    </button>
    {expanded && 
    (<div className="border-t border-slate-100 px-4">
      {tasks.map((task) => 
      <TaskCard key={task.id} task={task} {...actions} />
    )}
    </div>
    )}
  </section>
}
