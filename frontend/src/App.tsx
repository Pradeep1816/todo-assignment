import { useState,useEffect } from 'react'
import './App.css'
import Onboarding from './components/Onboarding'
import { seedTasks } from './data/seedTask';
import type { Task } from './types/task'
import Dashboard from './pages/Dashboard';
import SearchView from './components/SearchView';
import TaskModal from './components/TaskModal';
const STORAGE_KEY = 'tasks_data';

function App() {
  const [started, setStarted] = useState(() => localStorage.getItem('onboardingStarted') === 'true');
  const [tasks, setTasks] = useState<Task[]>(() => {
    try { 
      const savedTasks  = localStorage.getItem(STORAGE_KEY);
      return  savedTasks ? JSON.parse(savedTasks) as Task[] : seedTasks;
    }catch { 
      return seedTasks 
    }
  });
  const [modalTask, setModalTask] = useState<Task | undefined>(undefined)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }, [tasks])
  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(t => `${t.title} ${t.description || ''}`.toLowerCase().includes(q))
  }, [tasks, query])

  const saveTask = (task: Task) => {
    if (task.id) setTasks(prev => prev.map(t => t.id === task.id ? task : t))
    else setTasks(prev => [{ ...task, id: crypto.randomUUID() }, ...prev])
    setModalTask(undefined)
  }
  const toggleTask = (task: Task) => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' } : t))
  const deleteTask = (task: Task) => {
    if (window.confirm(`Delete "${task.title}"?`)) setTasks(prev => prev.filter(t => t.id !== task.id))
  }

  if (!started) {
    return (
      <Onboarding onStart={() => {
        localStorage.setItem('onboardingStarted', 'true');
        setStarted(true);
      }} />
    );
  }


  return <>
    {searchOpen
      ? <SearchView query={query} setQuery={setQuery} tasks={filteredTasks} onBack={() => { setSearchOpen(false); setQuery('') }} onToggle={toggleTask} onEdit={setModalTask} onDelete={deleteTask} />
      : <Dashboard tasks={tasks} onAdd={() => setModalTask(null)} onEdit={setModalTask} onDelete={deleteTask} onToggle={toggleTask} onSearch={() => setSearchOpen(true)} />}
    {modalTask !== undefined && <TaskModal task={modalTask} onClose={() => setModalTask(undefined)} onSave={saveTask} />}
  </>
}

export default App
function useMemo(arg0: () => any, arg1: any[]) {
  throw new Error('Function not implemented.');
}

