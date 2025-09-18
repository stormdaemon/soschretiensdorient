export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string[];
  publishedAt: string;
  tags: string[];
  author: string;
  readTime: string;
  sourceUrl?: string;
}

export interface ArticleFeedProps {
  articles: Article[];
  className?: string;
}
