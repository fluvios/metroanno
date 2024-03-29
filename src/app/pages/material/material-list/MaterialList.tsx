import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {MaterialsListHeader} from './components/header/MaterialsListHeader'
import {MaterialsTable} from './table/MaterialsTable'
import {MaterialEditModal} from './material-modal/MaterialEditModal'
import {AnnotationEditModal} from './annotation-modal/AnnotationEditModal'
import {KTCard} from '../../../../_metronic/helpers'

const MaterialList = () => {
  const {itemIdForUpdate, itemHighlightIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <MaterialsListHeader />
        <MaterialsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <MaterialEditModal />}
      {itemHighlightIdForUpdate !== undefined && <AnnotationEditModal />}      
    </>
  )
}

const MaterialListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <MaterialList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {MaterialListWrapper}
