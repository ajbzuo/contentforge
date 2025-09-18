
import Link from 'next/link'
import { getAllArticles } from '../lib/getContent'

export default function Home() {
  const articles = getAllArticles()
  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Static Content Site</h1>
      <p>All content served from a JSON file. Perfect for Zephr paywall tests.</p>
      <ul>
        {articles.map(a => (
          <li key={a.id}>
            <Link href={`/article/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
