import { useEffect, useState } from 'react'
import { Search, Plus, User, Mail } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CRM() {
  const [query, setQuery] = useState('')
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' })

  const load = async () => {
    const res = await fetch(`${API}/clients?q=${encodeURIComponent(query)}`, { headers: { 'X-Role': 'assistant' } })
    const data = await res.json()
    setClients(data)
  }

  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Role': 'assistant' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      setForm({ first_name: '', last_name: '', email: '' })
      load()
    }
  }

  return (
    <section className="px-6 py-8 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-xl border border-white/10 bg-slate-800/60 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Search size={18} className="text-blue-300" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search clients" className="flex-1 bg-transparent outline-none placeholder:text-blue-200/40" />
            <button onClick={load} className="px-3 py-1.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-100">Search</button>
          </div>
          <div className="divide-y divide-white/5">
            {clients.map(c => (
              <div key={c._id} className="py-3 flex items-center gap-3">
                <User size={18} className="text-blue-300" />
                <div className="font-medium">{c.first_name} {c.last_name}</div>
                <div className="text-blue-200/70 flex items-center gap-1"><Mail size={14}/> {c.email}</div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={create} className="w-full md:w-80 rounded-xl border border-white/10 bg-slate-800/60 p-5">
          <div className="text-sm text-blue-200/70 mb-3">New Client</div>
          <input value={form.first_name} onChange={(e)=>setForm(v=>({...v, first_name:e.target.value}))} placeholder="First name" className="w-full mb-2 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" required />
          <input value={form.last_name} onChange={(e)=>setForm(v=>({...v, last_name:e.target.value}))} placeholder="Last name" className="w-full mb-2 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" required />
          <input value={form.email} onChange={(e)=>setForm(v=>({...v, email:e.target.value}))} placeholder="Email" className="w-full mb-3 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" required />
          <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition text-white"><Plus size={16}/> Create</button>
        </form>
      </div>
    </section>
  )
}
