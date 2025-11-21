import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import CRM from './components/CRM'
import Scheduler from './components/Scheduler'
import Payments from './components/Payments'
import { LayoutDashboard, Users, CalendarDays, CreditCard } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [tab, setTab] = useState('dashboard')
  const [dash, setDash] = useState(null)

  const loadDash = async () => {
    try {
      const res = await fetch(`${API}/dashboard`, { headers: { 'X-Role': 'assistant' } })
      const data = await res.json()
      setDash(data)
    } catch (e) { /* ignore */ }
  }

  useEffect(() => { loadDash() }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <nav className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-blue-100">
          <button onClick={()=>setTab('dashboard')} className={`px-3 py-2 rounded-md inline-flex items-center gap-2 hover:bg-white/5 ${tab==='dashboard'?'bg-white/10':''}`}><LayoutDashboard size={18}/> Dashboard</button>
          <button onClick={()=>setTab('crm')} className={`px-3 py-2 rounded-md inline-flex items-center gap-2 hover:bg-white/5 ${tab==='crm'?'bg-white/10':''}`}><Users size={18}/> CRM</button>
          <button onClick={()=>setTab('scheduler')} className={`px-3 py-2 rounded-md inline-flex items-center gap-2 hover:bg-white/5 ${tab==='scheduler'?'bg-white/10':''}`}><CalendarDays size={18}/> Scheduling</button>
          <button onClick={()=>setTab('payments')} className={`px-3 py-2 rounded-md inline-flex items-center gap-2 hover:bg-white/5 ${tab==='payments'?'bg-white/10':''}`}><CreditCard size={18}/> Payments</button>
        </div>
      </nav>

      {tab === 'dashboard' && <Dashboard data={dash} />}
      {tab === 'crm' && <CRM />}
      {tab === 'scheduler' && <Scheduler />}
      {tab === 'payments' && <Payments />}

      <footer className="px-6 py-10 text-center text-blue-200/60">Built with Flames Blue</footer>
    </div>
  )
}

export default App
