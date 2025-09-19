import React from 'react'

export const Section: React.FC<{ title: string; right?: React.ReactNode; children: React.ReactNode }>
  = ({ title, right, children }) => (
  <section className="bg-white/80 dark:bg-slate-900/70 backdrop-blur rounded-2xl shadow-soft p-4 md:p-6 border border-gray-100 dark:border-slate-800 ring-1 ring-transparent hover:ring-indigo-200 dark:hover:ring-indigo-800 transition animate-fade">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      {right}
    </div>
    {children}
  </section>
)

export const Badge: React.FC<{ children: React.ReactNode; tone?: 'gray'|'green'|'red'|'yellow'|'blue' }>
  = ({ children, tone = 'gray' }) => (
  <span className={
    {
      gray: 'bg-gray-100/80 dark:bg-slate-800 text-gray-800 dark:text-gray-200',
      green: 'bg-green-100/80 dark:bg-green-900/50 text-green-700 dark:text-green-300',
      red: 'bg-red-100/80 dark:bg-red-900/50 text-red-700 dark:text-red-300',
      yellow: 'bg-yellow-100/80 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
      blue: 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
    }[tone] + ' inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium'}
  >{children}</span>
)

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = '', ...props }) => (
  <button {...props} className={'px-3 py-2 rounded-xl border text-sm font-medium bg-gray-50/70 dark:bg-slate-900/60 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-slate-700 hover:bg-gray-100/70 dark:hover:bg-slate-900 transition ' + className} />
)

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input {...props} className={'px-3 py-2 rounded-xl border w-full outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 bg-white/70 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border-gray-200 dark:border-slate-700 ' + className} />
)

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea {...props} className={'px-3 py-2 rounded-xl border w-full outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 bg-white/70 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 border-gray-200 dark:border-slate-700 min-h-[80px] ' + className} />
)

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', ...props }) => (
  <select {...props} className={'px-3 py-2 rounded-xl border w-full outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 bg-white/70 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-slate-700 ' + className} />
)
