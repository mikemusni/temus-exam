/* eslint-disable indent */
/* eslint-disable react/display-name */
import React, { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router'
import RedirectShortened from '../Page/Redirect'
import SuspenseLoader from '../components/SuspenseLoader'
import BaseLayout from '../layouts'

const Loader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  )

const Home = Loader(lazy(() => import('../Page/Home')))
const Error404 = Loader(lazy(() => import('../Page/Error/404')))

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/:shortEnd',
    element: <RedirectShortened />
  },
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
]

export default routes
