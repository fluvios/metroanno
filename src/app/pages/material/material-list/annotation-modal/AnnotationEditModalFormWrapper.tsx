import {useQuery} from 'react-query'
import {AnnotationEditModalFormNew as AnnotationEditModalForm} from './AnnotationEditModalFormNew'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {randomDocument} from '../core/_requests'

const AnnotationEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: material,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-annotation-${itemIdForUpdate}`,
    () => {
      return randomDocument()
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
    if (material) {
      return (
        <AnnotationEditModalForm
          isUserLoading={isLoading}
          material={material}
          feedback={{
            document_id: undefined,
            feedback_text: undefined,
          }}
        />
      )
    } else {
      return (
        <AnnotationEditModalForm
          isUserLoading={isLoading}
          feedback={{
            document_id: undefined,
            feedback_text: undefined,
          }}
          material={{
            code: undefined,
            message: undefined,
            data: undefined,
            payload: undefined,
          }}
        />
      )
    }
  }

  if (!isLoading && !error && material) {
    return (
      <AnnotationEditModalForm
        isUserLoading={isLoading}
        material={material}
        feedback={{
          document_id: undefined,
          feedback_text: undefined,
        }}
      />
    )
  }

  return null
}

export {AnnotationEditModalFormWrapper}
