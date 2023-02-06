import {useListView} from '../../core/ListViewProvider'
import {MaterialListToolbar} from './MaterialListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {MaterialListSearchComponent} from './MaterialListSearchComponent'

const MaterialsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <MaterialListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <MaterialListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {MaterialsListHeader}
