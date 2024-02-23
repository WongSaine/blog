import classes from './FlashMessage.module.scss'

interface Props {
  message: string
  mode?: string
}

const FlashMessage = ({ message, mode = 'none' }: Props) => {
  const classNames = [classes.flash]

  switch (mode) {
    case 'danger':
      classNames.push(classes.flashDanger)
      break
    default:
      break
  }

  return (
    <div className={classNames.join(' ')}>
      <p>{message}</p>
    </div>
  )
}

export default FlashMessage
