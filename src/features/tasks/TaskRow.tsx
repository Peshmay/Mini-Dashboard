import React from 'react'
import { Badge, Button, TextArea, TextInput, Select } from '../../components/UI'
import { Task, Priority } from './domain'
import { fmtDatePretty } from '../../utils/dates'

export const TaskRow: React.FC<{ task: Task; onToggle: (id: string)=>void; onDelete: (id: string)=>void; onEdit: (id: string, patch: Partial<Task>)=>void }>
  = ({ task, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = React.useState(false)
  const [title, setTitle] = React.useState(task.title)
  const [notes, setNotes] = React.useState(task.notes || '')
  const [due, setDue] = React.useState(task.due || '')
  const [priority, setPriority] = React.useState<Priority>(task.priority)

  const save = () => { onEdit(task.id, { title, notes: notes || undefined, due: due || undefined, priority }); setEditing(false) }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-3 border rounded-xl bg-white/40 dark:bg-slate-900/40 border-gray-200 dark:border-slate-700">
      <div className="flex items-center gap-3 flex-1">
        <input type="checkbox" checked={task.done} onChange={()=>onToggle(task.id)} className="w-5 h-5 accent-indigo-600 dark:accent-indigo-500" />
        {editing ? (
          <div className="flex-1 grid gap-2">
            <TextInput value={title} onChange={e=>setTitle(e.target.value)} />
            <div className="grid md:grid-cols-3 gap-2">
              <TextInput type="date" value={due} onChange={e=>setDue(e.target.value)} />
              <Select value={priority} onChange={e=>setPriority(e.target.value as Priority)}>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <TextArea value={notes} onChange={e=>setNotes(e.target.value)} />
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={"font-medium " + (task.done ? "line-through text-gray-500 dark:text-gray-400" : "")}>{task.title}</span>
              <Badge tone={{ low: 'gray', med: 'blue', high: 'red' }[task.priority]}>prio {task.priority}</Badge>
              <Badge tone="yellow">due {fmtDatePretty(task.due)}</Badge>
              {task.done && <Badge tone="green">done</Badge>}
            </div>
            {task.notes && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{task.notes}</p>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <Button onClick={save} className="bg-gradient-to-b from-green-600 to-green-700 border-green-700 text-white hover:brightness-110">Save</Button>
            <Button onClick={()=>setEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={()=>setEditing(true)}>Edit</Button>
            <Button onClick={()=>onDelete(task.id)} className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">Delete</Button>
          </>
        )}
      </div>
    </div>
  )
}
