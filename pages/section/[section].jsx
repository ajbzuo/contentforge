
import ArticleCard from '../../components/ArticleCard'
import articles from '../../data/articles.json'

export default function SectionPage({ section, items }){
  return (
    <main className="container-narrow px-4">
      <div className="py-6 hr-thick"></div>
      <h1 className="font-serif text-3xl mb-4">{section}</h1>
      {items.length === 0 ? (
        <p>No stories yet in this section. Add items to /data/articles.json.</p>
      ) : (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(a => <ArticleCard key={a.slug} article={a} />)}
        </section>
      )}
    </main>
  )
}

export async function getStaticPaths(){
  const sections = Array.from(new Set(articles.map(a => a.section)))
  const paths = sections.map(s => ({ params: { section: s } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const section = params.section
  const items = articles.filter(a => a.section === section)
  return { props: { section, items } }
}
