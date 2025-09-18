
import ArticleCard from '../components/ArticleCard'
import articles from '../data/articles.json'

export default function Home(){
  const sorted = [...articles].sort((a,b)=> new Date(b.date) - new Date(a.date))
  const [hero, ...rest] = sorted
  const colA = rest.slice(0, 5)
  const colB = rest.slice(5, 10)

  return (
    <main className="container-narrow px-4">
      <div className="py-6 hr-thick"></div>

      {/* Hero row */}
      {hero ? (
        <section className="grid md:grid-cols-3 gap-6">
          <ArticleCard article={hero} large />
          <div className="space-y-6">{colA.map(a => <ArticleCard key={a.slug} article={a} />)}</div>
          <div className="space-y-6">{colB.map(a => <ArticleCard key={a.slug} article={a} />)}</div>
        </section>
      ) : <p className="py-12">Add articles to <code>/data/articles.json</code> to populate the homepage.</p>}

      <div className="py-6 hr-thin mt-8"></div>

      {/* More stories grid */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sorted.map(a => <ArticleCard key={a.slug} article={a} />)}
      </section>
    </main>
  )
}
