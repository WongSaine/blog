import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Popconfirm } from 'antd'

import { IArticle } from '../../models/IArticle.ts'
import Like from '../Like'
import emptyAvatarImage from '../../assets/empty-avatar.png'
import TagsList from '../TagsList'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { deleteArticle } from '../../store/articles/articlesActions.ts'

import classes from './Article.module.scss'

interface Props {
  article: IArticle
  expanded?: boolean
  likeClickHandler?: () => void
}

const Article = ({ article, expanded = false, likeClickHandler = undefined }: Props) => {
  const user = useAppSelector((state) => state.userReducer.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const confirmDelete = async () => {
    await dispatch(deleteArticle(article.slug)).then(() => {
      navigate('/')
    })
  }

  return (
    <article className={classes.article}>
      <header className={classes.article__header}>
        <div className={classes.article__info}>
          <div className={classes.article__titleWrapper}>
            <Link to={`/articles/${article.slug}`} className={classes.article__title}>
              {article.title}
            </Link>
            <Like count={article.favoritesCount} isLiked={article.favorited} onClick={likeClickHandler} />
          </div>
          <TagsList tags={article.tagList} />
        </div>
        <div className={classes.article__author}>
          <div className={classes.article__authorWrapper}>
            <p className="author__name">{article.author.username}</p>
            <span className={classes.article__publishedDate}>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
          <img
            src={article.author.image ?? emptyAvatarImage}
            alt={article.author.username}
            className={classes.article__authorAvatar}
          />
        </div>
      </header>
      <div className={classes.article__secondLine}>
        <section className={classes.article__description}>{article.description}</section>
        {expanded && article.author.username === user?.username && (
          <div className={classes.article__controls}>
            <Popconfirm
              placement="rightTop"
              title={'Are you sure to delete this article'}
              description={''}
              onConfirm={confirmDelete}
              okText="Yes"
              cancelText="No"
            >
              <button
                type={'button'}
                className={[classes.article__controlButton, classes.article__controlButtonDelete].join(' ')}
              >
                Delete
              </button>
            </Popconfirm>

            <Link
              to={`/articles/${article.slug}/edit`}
              className={[classes.article__controlButton, classes.article__controlButtonEdit].join(' ')}
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      {expanded && (
        <section className={classes.article__body}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </section>
      )}
    </article>
  )
}
export default Article
