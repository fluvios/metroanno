import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {UsersListWrapper} from './material-list/MaterialList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Material Management',
    path: '/material/lists',
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

const MaterialPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='lists'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Material list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/material/lists' />} />
    </Routes>
  )
}

export default MaterialPage
