import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/index.ts'
import emptyAvatar from '../../../assets/empty-avatar.png'
import { usersSlice } from '../../../store/users/usersSlice.ts'

import classes from './Header.module.scss'

const Header = () => {
  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  return (
    <header className={classes.header}>
      <Link to="/" className="logo">
        Realworld Blog
      </Link>
      <div className={classes.header__constrols}>
        {!user ? (
          <>
            <Link to="/sign-in" className={[classes.header__btn, classes.header__signIn].join(' ')}>
              Sign In
            </Link>
            <Link to="/sign-up" className={[classes.header__btn, classes.header__btnGreen].join(' ')}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to={'/articles/new'}
              className={[classes.header__btn, classes.header__btnGreen, classes.header__btn__small].join(' ')}
            >
              Create Article
            </Link>
            <Link to="/profile" className={classes.header__profile}>
              {user.username}
              <img src={user.image ?? emptyAvatar} alt={user.username} className={classes.header__avatar} />
            </Link>
            <button
              type="button"
              className={[classes.header__btn, classes.header__logOut].join(' ')}
              onClick={() => {
                dispatch(usersSlice.actions.logOut())
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
