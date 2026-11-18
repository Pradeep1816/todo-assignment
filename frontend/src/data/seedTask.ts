import type { Task } from '../types/task'
const today = new Date()
const at = (offset: number, hour = 10) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offset)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

export const seedTasks: Task[] = [
  { id: '1', title: 'Finishing Wireframe', description: 'Review the final dashboard wireframe.', dueDate: at(0, 11), priority: 'High', status: 'In Progress' },
  { id: '2', title: 'Meeting with team', description: 'Discuss sprint progress and blockers.', dueDate: at(0, 14), priority: 'Medium', status: 'In Progress' },
  { id: '3', title: 'Buy cat food', description: '', dueDate: at(0, 17), priority: 'Low', status: 'Completed' },
  { id: '4', title: 'Finishing daily commission', description: 'Complete the daily review.', dueDate: at(1, 12), priority: 'Medium', status: 'Completed' },
  { id: '5', title: 'Prepare project update', description: 'Share the weekly update with the team.', dueDate: at(3, 9), priority: 'High', status: 'In Progress' },
  { id: '6', title: 'Read a technical article', description: 'Spend 30 minutes learning.', dueDate: at(5, 18), priority: 'Low', status: 'In Progress' },
]