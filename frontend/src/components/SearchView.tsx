import type { Task } from "../types/task";
import { ArrowLeft, Search, X } from "lucide-react";
import TaskCard from "./TaskCard";

interface SearchViewProps {
  query: string;
  setQuery: (query: string) => void;
  tasks: Task[];
  onBack: () => void;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}


export default function SearchView({
  query,
  setQuery,
  tasks,
  onBack,
  ...actions }: SearchViewProps) {
  return <section className="min-h-screen bg-white">
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5 sm:px-8">
      <div className="mb-6 flex items-center gap-3"><button onClick={onBack} className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100"><ArrowLeft size={19} /></button><h1 className="text-lg font-bold">Search tasks</h1></div>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-[#4964ed]"><Search size={17} className="text-slate-400" /><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or description..." className="min-w-0 flex-1 text-sm outline-none" />{query && <button onClick={() => setQuery('')}><X size={16} className="text-slate-400" /></button>}</div>
      <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-wider text-slate-400">{query ? `${tasks.length} result${tasks.length === 1 ? '' : 's'}` : 'All tasks'}</p>
      {tasks.length ? <div>{tasks.map(task => <TaskCard key={task.id} task={task} {...actions} />)}</div> : <div className="py-16 text-center"><Search className="mx-auto mb-3 text-slate-300" size={30} /><p className="font-semibold text-slate-700">No tasks found</p><p className="mt-1 text-sm text-slate-400">Try another keyword.</p></div>}
    </div>
  </section>
}
