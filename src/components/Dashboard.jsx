import { CalendarDays, FileText, Users, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard({ data }) {
  const kpis = data?.kpis || {}
  const recent = data?.recent_activity || []

  const cards = [
    { label: 'Appointments Today', value: kpis.appointments_today || 0, icon: CalendarDays },
    { label: 'Open Cases', value: kpis.open_cases || 0, icon: FileText },
    { label: 'Completed Cases', value: kpis.completed_cases || 0, icon: TrendingUp },
  ]

  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-white/10 bg-slate-800/60 p-5 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-300">
                <c.icon size={22} />
              </div>
              <div>
                <div className="text-sm text-blue-200/70">{c.label}</div>
                <div className="text-2xl font-semibold">{c.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-white/90 font-medium mb-3">Recent Activity</h3>
        <div className="rounded-xl border border-white/10 bg-slate-800/60 divide-y divide-white/5">
          {recent.length === 0 && (
            <div className="p-4 text-sm text-blue-200/70">No activity yet.</div>
          )}
          {recent.map((a) => (
            <div key={a._id} className="p-4 text-blue-100/90 flex items-center gap-2">
              <Clock size={16} className="text-blue-300" />
              <span className="text-blue-200/80">{new Date(a.created_at).toLocaleString?.() || ''}</span>
              <span className="mx-2 text-blue-300/40">•</span>
              <span className="capitalize">{a.actor_role}</span>
              <span className="mx-2 text-blue-300/40">→</span>
              <span>{a.action.replace('_', ' ')} {a.entity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
