import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'

const MaterialListToolbar = () => {
  const {setItemIdForUpdate, setItemHighlightIdForUpdate} = useListView()
  const openAddMaterialModal = () => {
    setItemIdForUpdate(null)
  }
  const openAddAnnotaionModal = () => {
    setItemHighlightIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Add New Annotation */}
      <button type='button' className='btn btn-info me-3' onClick={openAddAnnotaionModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Annotation
      </button>
      {/* end::Add New Annotation */}      

      {/* begin::Add New Material */}
      <button type='button' className='btn btn-success' onClick={openAddMaterialModal}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Material
      </button>
      {/* end::Add New Material */}
    </div>
  )
}

export {MaterialListToolbar}
