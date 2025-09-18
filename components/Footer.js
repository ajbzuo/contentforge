
export default function Footer(){
  return (
    <footer className="mt-12 border-t border-zinc-300">
      <div className="container-narrow px-4 py-8 text-sm text-zinc-500">
        © {new Date().getFullYear()} The Ledger Times • Static build (drop JSON in /data to publish).
      </div>
    </footer>
  )
}
