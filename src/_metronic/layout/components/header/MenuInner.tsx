import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title='Material' to='/material' />
      <MenuItem title='Annotation' to='/annotator' />
      <MenuItem title='User' to='/apps/user-management/users' />
    </>
  )
}
