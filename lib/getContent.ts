
import fs from 'fs'
import path from 'path'

export type Article = {
  id: string
  title: string
  body: string
}

export function getAllArticles(): Article[] {
  const filePath = path.join(process.cwd(), 'data', 'content.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export function getArticleById(id: string): Article | null {
  const articles = getAllArticles()
  return articles.find(a => a.id === id) || null
}
