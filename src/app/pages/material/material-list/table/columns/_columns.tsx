// @ts-nocheck
import {Column} from 'react-table'
import {MaterialInfoCell} from './MaterialInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {Material} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Material>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Subject' className='min-w-125px' />,
    id: 'subject',
    Cell: ({...props}) => <MaterialInfoCell user={props.data[props.row.index].text_document} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Learning Outcome' className='min-w-125px' />,
    id: 'learningoutcome',
    Cell: ({...props}) => <MaterialInfoCell user={props.data[props.row.index].learning_outcome} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Current Annotator' className='min-w-125px' />
    ),
    id: 'currentannotators',
    Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
