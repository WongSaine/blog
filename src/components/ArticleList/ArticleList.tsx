import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import Article from '../Article'
import { fetchArticles, likeArticle, unlikeArticle } from '../../store/articles/articlesActions.ts'
import Pagination from '../Pagination'
import { IArticle } from '../../models/IArticle.ts'
import { commonSlice } from '../../store/common/commonSlice.ts'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  const dispatch = useAppDispatch()

  const { articles, page } = useAppSelector((state) => state.articleReducer)
  const user = useAppSelector((state) => state.userReducer.user)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [page])

  const likeClickHandler = async (article: IArticle) => {
    if (user) {
      const callback = article.favorited ? unlikeArticle : likeArticle

      await dispatch(callback(article.slug)).then(() => {
        dispatch(fetchArticles())
      })
    } else {
      dispatch(
        commonSlice.actions.setErrors({ status: 0, errors: [{ key: 'authorization', message: 'no permission' }] })
      )
    }
  }

  return (
    <div className={classes.articlesList}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} likeClickHandler={() => likeClickHandler(article)} />
      ))}
      <Pagination />
    </div>
  )
}

export default ArticleList
