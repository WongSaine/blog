import classes from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className="container">
      <div className={classes.customLoader}></div>
    </div>
  )
}

export default Spinner
