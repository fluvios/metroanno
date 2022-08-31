/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/material'
        icon='/media/icons/duotune/art/art002.svg'
        title='Material'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/annotator'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Annotation'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User'
        fontIcon='bi-layers'
      />
    </>
  )
}
