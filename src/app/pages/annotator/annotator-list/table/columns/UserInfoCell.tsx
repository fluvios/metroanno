/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {QuestionAnnotation} from '../../core/_models'

type Props = {
  user: QuestionAnnotation
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
  </div>
)

export {UserInfoCell}
