
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { X } from 'lucide-react';

interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'In Progress' | 'Completed';
}

interface TaskForm {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'In Progress' | 'Completed';
}

interface TaskModalProps {
  task: Task | undefined;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const empty: TaskForm = {
  title: '',
  description: '',
  date: '',
  time: '09:00',
  priority: 'Medium',
  status: 'In Progress',
};

// Accept a Date object
const localInputDate = (value: Date): string => {
  return `${value.getFullYear()}-${String(
    value.getMonth() + 1
  ).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
};

export default function TaskModal({
  task,
  onClose,
  onSave,
}: TaskModalProps) {
  const [form, setForm] = useState<TaskForm>(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      const d = new Date(task.dueDate);

      setForm({
        title: task.title,
        description: task.description || '',
        date: localInputDate(d),
        time: `${String(d.getHours()).padStart(2, '0')}:${String(
          d.getMinutes()
        ).padStart(2, '0')}`,
        priority: task.priority || 'Medium',
        status: task.status || 'In Progress',
      });
    } else {
      const now = new Date();

      setForm({
        ...empty,
        date: localInputDate(now),
      });
    }

    setError('');
  }, [task]);

  const change = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return setError('Please enter a task title.');
    }

    if (!form.date || !form.time) {
      return setError('Please select a date and time.');
    }

    const dueDate = new Date(
      `${form.date}T${form.time}`
    ).toISOString();

    onSave({
      ...(task || {}),
      ...form,
      title: form.title.trim(),
      dueDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >
      <form
        onSubmit={submit}
        className="w-full max-w-[480px] rounded-t-[26px] bg-white p-5 shadow-2xl sm:rounded-[26px] sm:p-7"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4964ed]">
              {task ? 'Update your plan' : 'Make it happen'}
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              {task ? 'Edit Task' : 'Add New Task'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <label className="mb-2 block text-xs font-semibold text-slate-600">
          Task title *
        </label>

        <input
          autoFocus
          name="title"
          value={form.title}
          onChange={change}
          placeholder="What do you need to do?"
          className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#4964ed] focus:ring-4 focus:ring-blue-50"
        />

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Set date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={change}
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-xs outline-none focus:border-[#4964ed]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Set time *
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={change}
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-xs outline-none focus:border-[#4964ed]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-slate-600">
            Priority
          </label>

          <div className="grid grid-cols-3 gap-2">
            {(['Low', 'Medium', 'High'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  setForm((v) => ({ ...v, priority: p }))
                }
                className={`rounded-xl border px-3 py-2.5 text-xs font-semibold ${
                  form.priority === p
                    ? 'border-[#4964ed] bg-blue-50 text-[#4964ed]'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold text-slate-600">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={change}
            rows={3}
            placeholder="Add a description (optional)"
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4964ed] focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {error && (
          <p className="mb-3 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-[#4964ed] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-[#354fda]"
        >
          {task ? 'Save Changes' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
