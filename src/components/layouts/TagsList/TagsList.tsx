import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { articleSlice } from '../../../store/articles/articleSlice.ts'
import { fetchArticles } from '../../../store/articles/articlesActions.ts'

import classes from './TagsList.module.scss'

interface Props {
  tags: string[]
}

const TagsList = ({ tags }: Props) => {
  const dispatch = useAppDispatch()
  const currentTag = useAppSelector((state) => state.articleReducer.tag)
  const navigate = useNavigate()

  const clickTagHandler = async (tag: string) => {
    dispatch(articleSlice.actions.setTag(tag))
    navigate('/')
    dispatch(fetchArticles())
  }

  return (
    <ul className={classes.tags}>
      {tags.map((tag, idx) => {
        tag = tag?.trim()
        if (!tag || !tag.length) {
          return null
        }

        return (
          <li key={idx}>
            <button
              className={[classes.tags__item, tag === currentTag ? classes.tags__itemActive : ''].join(' ')}
              onClick={() => clickTagHandler(tag)}
            >
              {tag}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default TagsList
