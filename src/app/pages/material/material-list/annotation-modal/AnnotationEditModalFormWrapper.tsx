import {useQuery} from 'react-query'
import {AnnotationEditModalForm} from './AnnotationEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getAnnotationsByID} from '../core/_requests'

const AnnotationEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: annotation,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getAnnotationsByID(itemIdForUpdate)
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
    return <AnnotationEditModalForm isUserLoading={isLoading} user={{question_type_id: undefined}} />
  }

  if (!isLoading && !error && annotation) {
    return <AnnotationEditModalForm isUserLoading={isLoading} user={annotation} />
  }

  return null
}

export {AnnotationEditModalFormWrapper}
