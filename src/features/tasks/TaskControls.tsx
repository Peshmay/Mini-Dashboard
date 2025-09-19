import React from 'react'
import { TextInput, Select } from '../../components/UI'
import { Priority } from './domain'

type SortKey = 'due' | 'created'

export const TaskControls: React.FC<{
  q: string; setQ: (v:string)=>void;
  status: 'all'|'active'|'done'; setStatus: (v: 'all'|'active'|'done')=>void;
  prio: 'all'|Priority; setPrio: (v: 'all'|Priority)=>void;
  sortBy: SortKey; setSortBy: (v: SortKey)=>void;
}> = ({ q, setQ, status, setStatus, prio, setPrio, sortBy, setSortBy }) => (
  <div className="grid md:grid-cols-4 gap-3">
    <TextInput placeholder="Search…" value={q} onChange={e=>setQ(e.target.value.toLowerCase())} />
    <Select value={status} onChange={e=>setStatus(e.target.value as any)}>
      <option value="all">All tasks</option>
      <option value="active">Active</option>
      <option value="done">Completed</option>
    </Select>
    <Select value={prio} onChange={e=>setPrio(e.target.value as any)}>
      <option value="all">All priorities</option>
      <option value="low">Low</option>
      <option value="med">Medium</option>
      <option value="high">High</option>
    </Select>
    <Select value={sortBy} onChange={e=>setSortBy(e.target.value as SortKey)}>
      <option value="due">Sort by due date</option>
      <option value="created">Sort by created</option>
    </Select>
  </div>
)
