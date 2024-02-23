import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchArticleBySlug, likeArticle, unlikeArticle } from '../../../store/articles/articlesActions.ts'
import Article from '../../widgets/Article'
import { IArticle } from '../../../models/IArticle.ts'
import { commonSlice } from '../../../store/common/commonSlice.ts'

const ArticlePage = () => {
  const dispatch = useAppDispatch()

  const currentArticle = useAppSelector((state) => state.articleReducer.currentArticle)
  const user = useAppSelector((state) => state.userReducer.user)

  const { slug } = useParams()

  useEffect(() => {
    if (slug) dispatch(fetchArticleBySlug(slug))
  }, [])

  if (!currentArticle) {
    return null
  }

  const likeClickHandler = async () => {
    if (user) {
      const callback = currentArticle.favorited ? unlikeArticle : likeArticle
      await dispatch(callback(currentArticle.slug)).then(() => dispatch(fetchArticleBySlug(currentArticle.slug)))
    } else {
      dispatch(
        commonSlice.actions.setErrors({ status: 0, errors: [{ key: 'authorization', message: 'no permission' }] })
      )
    }
  }

  return <Article article={currentArticle as IArticle} likeClickHandler={likeClickHandler} expanded />
}

export default ArticlePage
