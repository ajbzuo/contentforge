export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  featured: boolean;
  imageUrl: string;
  tags: string[];
  readTime?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ArticlesData {
  articles: Article[];
  categories: Category[];
  breakingNews: string[];
}
