import { startOfWeek } from '../utils/dateUtils'

export default function WeekStrip({ selectedDate, onSelect }) {
  const monday = startOfWeek(selectedDate)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
  const selected = new Date(selectedDate)
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map(day => {
        const active = day.toDateString() === selected.toDateString()
        return <button key={day.toISOString()} onClick={() => onSelect(day)} className={`rounded-xl py-2.5 text-center transition ${active ? 'bg-[#4964ed] text-white shadow-md shadow-blue-200' : 'bg-white text-slate-500 hover:bg-blue-50'}`}>
          <span className={`block text-[10px] font-medium ${active ? 'text-white/75' : 'text-slate-400'}`}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span className="mt-1 block text-sm font-bold">{day.getDate()}</span>
        </button>
      })}
    </div>
  )
}
