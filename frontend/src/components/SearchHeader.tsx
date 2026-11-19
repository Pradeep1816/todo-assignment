import { Bell, Search, Settings2 } from "lucide-react";

export default function SearchHeader({onSearch}: {onSearch: (query:string) => void}){
    return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400">Good to see you</p>
        <h1 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">My Tasks</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=>onSearch('')} aria-label="Search tasks" className="grid h-10 w-10 place-items-center rounded-full border border-slate-100 bg-white text-slate-600 hover:bg-slate-50"><Search size={18}/></button>
        <button aria-label="Settings" className="grid h-10 w-10 place-items-center rounded-full border border-slate-100 bg-white text-slate-600"><Settings2 size={18}/></button>
        <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-100 bg-white text-slate-600"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#4964ed]"/></button>
      </div>
    </header>
  )
}