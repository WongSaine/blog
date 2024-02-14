import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import { useAppSelector } from './hooks'
import Spinner from './components/Spinner'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'
import Login from './components/Login'
import FlashMessage from './components/FlashMessage'
import Registration from './components/Registration'
import ProfilePage from './components/ProfilePage'
import ArticleFormPage from './components/ArticleFormPage'
import ErrorPage from './components/ErrorPage'

function App() {
  const { isLoading, errors } = useAppSelector((state) => state.commonReducer)

  const user = useAppSelector((state) => state.userReducer.user)

  return (
    <>
      <BrowserRouter>
        <Header />
        {isLoading && <Spinner />}
        <main className={'container content'}>
          <Routes>
            <Route path={'/'} element={<ArticleList />} />
            <Route path={'/articles'} element={<ArticleList />} />
            <Route path={'/articles/:slug'} element={<ArticlePage />} />
            <Route path={'/articles/:slug/edit'} element={!user ? <Login /> : <ArticleFormPage />} />
            <Route path={'/sign-in'} element={!user ? <Login /> : <Navigate to={'/'} />} />
            <Route path={'/sign-up'} element={!user ? <Registration /> : <Navigate to={'/'} />} />
            <Route path={'/profile'} element={user ? <ProfilePage /> : <Navigate to={'/sign-in'} />} />
            <Route path={'/articles/new'} element={user ? <ArticleFormPage /> : <Navigate to={'/sign-in'} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {errors.errors && (
            <div className="flash-bar">
              {errors.errors.map((error, idx) => (
                <FlashMessage message={`${error.key} - ${error.message}`} key={idx} mode={'danger'} />
              ))}
            </div>
          )}
        </main>

        <footer></footer>
      </BrowserRouter>
    </>
  )
}

export default App
