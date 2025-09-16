import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  date: z.string(),
  category: z.string(),
  imageUrl: z.string(),
  readTime: z.string(),
  featured: z.boolean().default(false),
});

export const insertArticleSchema = articleSchema.omit({ id: true });

export type Article = z.infer<typeof articleSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export const categories = [
  "Politics",
  "Business", 
  "Technology",
  "Health",
  "Entertainment",
  "Science",
  "World"
] as const;

export type Category = typeof categories[number];
