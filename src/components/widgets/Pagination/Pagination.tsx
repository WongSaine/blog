import { useAppDispatch } from '../../../hooks/useAppDispatch.ts'
import { useAppSelector } from '../../../hooks/useAppSelector.ts'
import { articleSlice } from '../../../store/articles/articleSlice.ts'
// @ts-ignore
import { ReactComponent as ArrowImg } from '../../../assets/arrow.svg'

import classes from './Pagination.module.scss'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const { page, perPage, articlesCount } = useAppSelector((state) => state.articleReducer)

  const totalPages = Math.ceil(articlesCount / perPage)

  if (totalPages < 2) {
    return null
  }

  const pages = []

  let startPage = Math.max(page === 1 ? page : page - 2, 1)
  startPage = Math.min(startPage, totalPages - 4)

  for (let i = startPage; i < startPage + 5; i++) {
    pages.push(i)
  }

  return (
    <div className={classes.pagination}>
      <div className={classes.pagination}>
        <button
          type="button"
          className={classes.pagination__button}
          onClick={() => dispatch(articleSlice.actions.setPage(page - 1))}
          disabled={page === 1}
        >
          <ArrowImg />
        </button>
        {pages.map((p) => (
          <button
            type="button"
            className={[classes.pagination__button, page === p ? classes.pagination__buttonActive : ''].join(' ')}
            key={p}
            onClick={() => dispatch(articleSlice.actions.setPage(p))}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className={classes.pagination__button}
          onClick={() => dispatch(articleSlice.actions.setPage(page + 1))}
          disabled={page === totalPages}
        >
          <ArrowImg className={classes.pagination__rightArrow} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
