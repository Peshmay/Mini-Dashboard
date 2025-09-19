import React from 'react'
import { Section } from '../../components/UI'
import { Task, createTask, toggleTask, editTask, filterTasks, byDueDateAsc, byCreatedDesc, Priority } from './domain'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { TaskForm } from './TaskForm'
import { TaskControls } from './TaskControls'
import { TaskRow } from './TaskRow'
import { TaskStats } from './TaskStats'

type SortKey = 'due' | 'created'

export const TaskSection: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('ptm.tasks.v1', [])

  const addTask = (t: Task) => setTasks(prev => [t, ...prev])
  const delTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id))
  const toggle = (id: string) => setTasks(prev => prev.map(t => t.id === id ? toggleTask(t) : t))
  const edit = (id: string, patch: Partial<Task>) => setTasks(prev => prev.map(t => t.id === id ? editTask(t, patch) : t))

  const [q, setQ] = React.useState('')
  const [statusF, setStatusF] = React.useState<'all'|'active'|'done'>('all')
  const [prio, setPrio] = React.useState<'all'|Priority>('all')
  const [sortBy, setSortBy] = React.useState<SortKey>('due')

  const visible = React.useMemo(() => {
    const fs = filterTasks(tasks, q, statusF, prio)
    return [...fs].sort(sortBy === 'due' ? byDueDateAsc : byCreatedDesc)
  }, [tasks, q, statusF, prio, sortBy])

  React.useEffect(() => {
    if (tasks.length === 0) {
      setTasks([
        createTask('Read a book chapter', { priority: 'low' }),
        createTask('Finish project proposal', { priority: 'high', due: new Date(Date.now()+86400000).toISOString().slice(0,10) }),
        createTask('Workout 30 minutes', { priority: 'med' }),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Section title="Your Tasks">
      <div className="space-y-4">
        <TaskStats tasks={tasks} />
        <TaskForm onAdd={addTask} />
        <TaskControls q={q} setQ={setQ} status={statusF} setStatus={setStatusF} prio={prio} setPrio={setPrio} sortBy={sortBy} setSortBy={setSortBy} />
        <div className="grid gap-3">
          {visible.length === 0 ? (
            <p className="text-gray-500">No tasks match your filters. Add a new one above.</p>
          ) : visible.map(task => (
            <TaskRow key={task.id} task={task} onToggle={toggle} onDelete={delTask} onEdit={edit} />
          ))}
        </div>
      </div>
    </Section>
  )
}
