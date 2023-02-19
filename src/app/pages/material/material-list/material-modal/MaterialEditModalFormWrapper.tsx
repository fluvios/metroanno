import {useQuery} from 'react-query'
import {MaterialEditModalForm} from './MaterialEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getDocumentsByID} from '../core/_requests'

const MaterialEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: material,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-material-${itemIdForUpdate}`,
    () => {
      return getDocumentsByID(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <MaterialEditModalForm isMaterialLoading={isLoading} material={{id: undefined}} />
  }

  if (!isLoading && !error && material) {
    return <MaterialEditModalForm isMaterialLoading={isLoading} material={material} />
  }

  return null
}

export {MaterialEditModalFormWrapper}
