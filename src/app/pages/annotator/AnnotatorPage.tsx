import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './annotator-list/AnnotatorList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Annotator Management',
    path: '/annotator/lists',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const AnnotatorPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='lists'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Annotation list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/annotator/lists' />} />
    </Routes>
  )
}

export default AnnotatorPage
