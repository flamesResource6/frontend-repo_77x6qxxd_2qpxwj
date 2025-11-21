import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="backdrop-blur-sm bg-black/30 rounded-2xl px-8 py-6 text-center text-white max-w-3xl mx-auto pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Notary Workspace</h1>
          <p className="mt-3 text-blue-100/90">Modern, secure, and efficient management for notary offices. Scheduling, cases, documents, and payments in one place.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
    </section>
  );
}
