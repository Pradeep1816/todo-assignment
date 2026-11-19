
'use client';

import { useMemo, useState } from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import type { Task } from '../types/task';

import Header from '../components/SearchHeader';
import WeekStrip from '../components/WeekStript';
import SummaryCards from '../components/SummaryCards';
import ProgressBar from '../components/ProgressBar';
import TaskCard from '../components/TaskCard';
import WeekSection from '../components/WeekSection';

import {
  dateKey,
  sameDay,
  startOfWeek,
} from '../utils/dateUtils';
import SearchHeader from '../components/SearchHeader';

interface DashboardProps {
  tasks: Task[];
  onAdd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggle: (task: Task) => void;
  onSearch: (query: string) => void;
}

export default function Dashboard({
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  onSearch,
}: DashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAll, setShowAll] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState(
    dateKey(new Date())
  );

  // Tasks belonging to the selected week
  const selectedWeekTasks = useMemo(
    () =>
      tasks.filter(
        (t) => dateKey(t.dueDate) === dateKey(selectedDate)
      ),
    [tasks, selectedDate]
  );

  // Summary calculations
  const completed = selectedWeekTasks.filter(
    (t) => t.status === 'Completed'
  ).length;

  const open = selectedWeekTasks.length - completed;

  // Today's tasks
  const todayTasks = useMemo(
    () =>
      tasks
        .filter((t) => sameDay(t.dueDate, new Date()))
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
        ),
    [tasks]
  );

  // Group tasks by week
  const groups = useMemo(() => {
    const map = new Map<
      string,
      { week: Date; tasks: Task[] }
    >();

    tasks.forEach((task: Task) => {
      const key = dateKey(task.dueDate);

      if (!map.has(key)) {
        map.set(key, {
          week: startOfWeek(task.dueDate),
          tasks: [],
        });
      }

      map.get(key)!.tasks.push(task);
    });

    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, value]) => ({
        key,
        ...value,
      }));
  }, [tasks]);

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-28">
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-6 sm:px-7 lg:px-10">

        {/* Header */}
        <SearchHeader onSearch={onSearch} />

        {/* Week selector */}
        <div className="mt-7 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm shadow-slate-100">
          <WeekStrip
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        {/* Summary */}
        <div className="mt-5">
          <SummaryCards
            completed={completed}
            open={open}
          />
        </div>

        {/* Progress */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm shadow-slate-100">
          <ProgressBar
            completed={completed}
            total={selectedWeekTasks.length}
          />
        </div>

        {/* Today's tasks */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Tasks Today
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {todayTasks.length} tasks scheduled
              </p>
            </div>

            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-xs font-semibold text-[#4964ed]"
            >
              {showAll ? 'Show Today' : 'View All'}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-4 shadow-sm shadow-slate-100">
            {(showAll ? tasks : todayTasks).length > 0 ? (
              (showAll ? tasks : todayTasks).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  compact
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="py-9 text-center">
                <CalendarDays
                  className="mx-auto mb-2 text-slate-300"
                  size={25}
                />

                <p className="text-sm font-semibold text-slate-600">
                  Nothing planned for today
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Add a task to get started.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Weekly tasks */}
        <div className="mt-8">
          <div className="mb-3">
            <h2 className="text-base font-extrabold text-slate-900">
              Your Weeks
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Tasks grouped Monday through Sunday
            </p>
          </div>

          <div className="space-y-3">
            {groups.map((group) => (
              <WeekSection
                key={group.key}
                week={group.week}
                tasks={group.tasks}
                expanded={expandedWeek === group.key}
                onExpand={() =>
                  setExpandedWeek(
                    expandedWeek === group.key ? '' : group.key
                  )
                }
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add task button */}
      <button
        onClick={onAdd}
        aria-label="Add task"
        className="fixed bottom-6 right-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#4964ed] text-white shadow-xl shadow-blue-300 transition hover:scale-105 hover:bg-[#354fda] sm:bottom-8 sm:right-[max(2rem,calc((100vw-64rem)/2))]"
      >
        <Plus size={27} />
      </button>
    </main>
  );
}
