import classes from './Like.module.scss'

interface Props {
  count: number
  isLiked?: boolean
  onClick?: () => void
}

const Like = ({ count, isLiked = false, onClick }: Props) => {
  return (
    <div className={classes.like}>
      <button
        type="button"
        className={[classes.like__btn, isLiked ? classes.like__btn_active : ''].join(' ')}
        onClick={onClick}
      ></button>
      <span className={classes.like__count}>{count}</span>
    </div>
  )
}

export default Like
