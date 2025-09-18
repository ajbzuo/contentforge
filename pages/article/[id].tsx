
import { useRouter } from 'next/router'
import { getArticleById } from '../../lib/getContent'
import { remark } from 'remark'
import html from 'remark-html'
import { useEffect, useState } from 'react'

export default function ArticlePage() {
  const router = useRouter()
  const { id } = router.query
  const [content, setContent] = useState<{title: string, html: string} | null>(null)

  useEffect(() => {
    if (!id) return
    const art = getArticleById(id as string)
    if (art) {
      remark().use(html).process(art.body).then(res => {
        setContent({ title: art.title, html: res.toString() })
      })
    }
  }, [id])

  if (!id) return <p>Loading...</p>
  if (!content) return <p>Not found</p>

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>{content.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: content.html }} />
    </main>
  )
}
