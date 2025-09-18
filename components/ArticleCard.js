
import Link from 'next/link'

export default function ArticleCard({article, large=false}){
  return (
    <article className={(large ? "md:col-span-2 " : "") + "card"}>
      <Link href={`/article/${article.slug}`} className="block group">
        {article.image ? (
          <div className="overflow-hidden rounded">
            <img src={article.image} alt={article.title} className="w-full aspect-[16/9] object-cover transition-opacity" />
          </div>
        ) : null}
        <div className="mt-3">
          <div className="section-kicker">{article.section}</div>
          <h2 className={"font-serif " + (large ? "text-3xl" : "text-xl")}>{article.title}</h2>
          {article.excerpt ? <p className="lede mt-1">{article.excerpt}</p> : null}
          <p className="byline mt-1">{article.author} • {article.date}</p>
        </div>
      </Link>
    </article>
  )
}
