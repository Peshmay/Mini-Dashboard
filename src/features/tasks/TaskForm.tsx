import React from 'react'
import { TextInput, TextArea, Select, Button } from '../../components/UI'
import { Task, Priority, createTask } from './domain'

export const TaskForm: React.FC<{ onAdd: (t: Task) => void }> = ({ onAdd }) => {
  const [title, setTitle] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [due, setDue] = React.useState('')
  const [priority, setPriority] = React.useState<Priority>('med')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    onAdd(createTask(t, { notes, due: due || undefined, priority }))
    setTitle(''); setNotes(''); setDue(''); setPriority('med')
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <TextInput placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <TextInput type="date" value={due} onChange={e=>setDue(e.target.value)} />
        <Select value={priority} onChange={e=>setPriority(e.target.value as Priority)}>
          <option value="low">Low priority</option>
          <option value="med">Medium priority</option>
          <option value="high">High priority</option>
        </Select>
      </div>
      <TextArea placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} />
      <div className="flex items-center justify-end gap-2">
        <Button type="submit" className="bg-gradient-to-b from-indigo-600 to-indigo-700 border-indigo-700 text-white hover:brightness-110">Add Task</Button>
      </div>
    </form>
  )
}
