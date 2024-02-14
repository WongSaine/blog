import { createBrowserRouter } from 'react-router-dom'

import ArticleList from './components/ArticleList'

export const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <ArticleList />,
      children: [],
    },
    {
      path: '/articles',
      element: <ArticleList />,
    },
  ],
  {
    basename: '/',
  }
)
