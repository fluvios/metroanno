/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Material} from '../../core/_models'

type Props = {
  material: any
}

const MaterialInfoCell: FC<Props> = ({material}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
      </a>
      <span>{material}</span>
    </div>
  </div>
)

export {MaterialInfoCell}
