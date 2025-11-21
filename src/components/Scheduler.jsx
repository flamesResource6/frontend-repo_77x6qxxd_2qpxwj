import { useEffect, useState } from 'react'
import { CalendarDays, Clock, Check } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Scheduler() {
  const [service, setService] = useState('Power of Attorney')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [start, setStart] = useState('10:00')
  const [duration, setDuration] = useState(60)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const s = new Date(`${date}T${start}:00Z`)
    const eTime = new Date(s.getTime() + duration*60000)
    const res = await fetch(`${API}/appointments/public`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, start_time: s.toISOString(), end_time: eTime.toISOString() })
    })
    if (res.ok) {
      setMessage('Booked! We sent a confirmation email (sample).')
    } else {
      const err = await res.json()
      setMessage(err.detail || 'Unable to book this slot')
    }
  }

  return (
    <section className="px-6 py-8 max-w-3xl mx-auto text-white">
      <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
        <div className="flex items-center gap-2 mb-4 text-blue-200/80"><CalendarDays size={18}/> Public Booking</div>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-blue-200/60">Service</label>
            <select value={service} onChange={(e)=>setService(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10">
              <option>Power of Attorney</option>
              <option>Affidavit</option>
              <option>Property Deed</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-blue-200/60">Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" />
          </div>
          <div>
            <label className="text-sm text-blue-200/60">Start time</label>
            <input type="time" value={start} onChange={(e)=>setStart(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" />
          </div>
          <div>
            <label className="text-sm text-blue-200/60">Duration (min)</label>
            <input type="number" value={duration} onChange={(e)=>setDuration(parseInt(e.target.value||'60'))} className="w-full mt-1 px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" />
          </div>
          <button className="md:col-span-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition">
            <Clock size={16}/> Book appointment
          </button>
        </form>
        {message && (
          <div className="mt-4 inline-flex items-center gap-2 text-green-300"><Check size={16}/> {message}</div>
        )}
      </div>
    </section>
  )
}
