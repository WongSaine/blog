import { IArticle } from './IArticle.ts'

export interface IArticleResponse {
  articles: IArticle[]
  articlesCount: number
}
