import { useState } from 'react'
import { CreditCard } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Payments() {
  const [service, setService] = useState('Notary Service')
  const [amount, setAmount] = useState(5000)
  const [msg, setMsg] = useState('')

  const pay = async () => {
    setMsg('Creating checkout session...')
    const res = await fetch(`${API}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, amount_cents: amount, success_url: window.location.href, cancel_url: window.location.href })
    })
    if (res.ok) {
      const data = await res.json()
      window.location.href = data.checkout_url
    } else {
      const err = await res.json()
      setMsg(err.detail || 'Stripe not configured in this demo')
    }
  }

  return (
    <section className="px-6 py-8 max-w-3xl mx-auto text-white">
      <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">
        <div className="text-blue-200/80 mb-3">Payments</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={service} onChange={(e)=>setService(e.target.value)} className="px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" />
          <input type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||'0'))} className="px-3 py-2 rounded-md bg-slate-900/60 border border-white/10" />
        </div>
        <button onClick={pay} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition"><CreditCard size={16}/> Pay with Stripe</button>
        {msg && <div className="mt-3 text-blue-200/80">{msg}</div>}
      </div>
    </section>
  )
}
