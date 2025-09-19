import React from 'react'
import { stats } from './domain'

export const TaskStats: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  const s = stats(tasks)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="p-3 rounded-xl bg-gray-50 text-center border"><div className="text-2xl font-semibold">{s.total}</div><div className="text-sm text-gray-600">Total</div></div>
      <div className="p-3 rounded-xl bg-green-50 text-center border border-green-100"><div className="text-2xl font-semibold">{s.done}</div><div className="text-sm text-green-700">Completed</div></div>
      <div className="p-3 rounded-xl bg-yellow-50 text-center border border-yellow-100"><div className="text-2xl font-semibold">{s.active}</div><div className="text-sm text-yellow-700">Active</div></div>
      <div className="p-3 rounded-xl bg-indigo-50 text-center border border-indigo-100"><div className="text-2xl font-semibold">{s.pct}%</div><div className="text-sm text-indigo-700">Done %</div></div>
    </div>
  )
}
