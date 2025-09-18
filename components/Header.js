
import Link from 'next/link'

const sections = ["Top Stories","Business","Tech","World","Policy","Culture","Opinion"]

export default function Header(){
  return (
    <header className="border-b border-zinc-300 bg-white/70 backdrop-blur">
      <div className="container-narrow px-4 py-6">
        <div className="flex items-end justify-between">
          <Link href="/" className="text-4xl font-serif tracking-tight">The Ledger Times</Link>
          <nav className="space-x-4 text-sm">
            {sections.map(s => (
              <Link key={s} className="hover:underline" href={`/section/${encodeURIComponent(s)}`}>{s}</Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
