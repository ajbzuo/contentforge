
import articles from '../../data/articles.json'
import { remark } from 'remark'
import html from 'remark-html'

export default function ArticlePage({ article, htmlBody }){
  if(!article) return <p className="container-narrow px-4 py-8">Not found</p>
  return (
    <main className="px-4">
      <div className="py-6 hr-thick"></div>
      <div className="section-kicker text-center">{article.section}</div>
      <h1 className="font-serif text-4xl text-center leading-tight max-w-3xl mx-auto">{article.title}</h1>
      <p className="byline text-center mt-1">{article.author} • {article.date}</p>
      {article.image ? (
        <div className="my-6 rounded overflow-hidden max-w-3xl mx-auto">
          <img src={article.image} alt={article.title} className="w-full object-cover" />
        </div>
      ) : null}
      {article.excerpt ? <p className="lede dropcap mb-6 max-w-3xl mx-auto text-justify">{article.excerpt}</p> : null}
      <article className="prose max-w-3xl mx-auto text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlBody }} />
    </main>
  )
}

export async function getStaticPaths(){
  const paths = articles.map(a => ({ params: { slug: a.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const article = articles.find(a => a.slug === params.slug) || null
  if(!article) return { notFound: true }
  const processed = await remark().use(html).process(article.body || '')
  return { props: { article, htmlBody: processed.toString() } }
}
