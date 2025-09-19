import { nowIso, uid } from '../../utils/id'

export type Priority = 'low' | 'med' | 'high'

export type Task = {
  id: string
  title: string
  notes?: string
  due?: string
  priority: Priority
  done: boolean
  createdAt: string
  updatedAt: string
}

export const createTask = (title: string, extras?: Partial<Task>): Task => ({
  id: uid(),
  title: title.trim(),
  notes: extras?.notes?.trim() || undefined,
  due: extras?.due || undefined,
  priority: extras?.priority || 'med',
  done: false,
  createdAt: nowIso(),
  updatedAt: nowIso(),
})

export const toggleTask = (t: Task): Task => ({ ...t, done: !t.done, updatedAt: nowIso() })
export const editTask = (t: Task, patch: Partial<Task>): Task => ({ ...t, ...patch, title: patch.title?.trim() ?? t.title, notes: patch.notes?.trim() ?? t.notes, updatedAt: nowIso() })

export const byDueDateAsc = (a: Task, b: Task) => {
  if (!a.due && !b.due) return 0
  if (!a.due) return 1
  if (!b.due) return -1
  return a.due.localeCompare(b.due)
}
export const byCreatedDesc = (a: Task, b: Task) => b.createdAt.localeCompare(a.createdAt)

export const filterTasks = (tasks: Task[], q: string, status: 'all'|'active'|'done', prio: 'all'|Priority) =>
  tasks.filter(t => {
    const matchesQ = q ? (t.title.toLowerCase().includes(q) || (t.notes || '').toLowerCase().includes(q)) : true
    const matchesStatus = status === 'all' ? true : status === 'done' ? t.done : !t.done
    const matchesPrio = prio === 'all' ? true : t.priority === prio
    return matchesQ && matchesStatus && matchesPrio
  })

export const stats = (tasks: Task[]) => {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  const active = total - done
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  return { total, done, active, pct }
}
