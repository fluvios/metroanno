import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialMaterial, Material} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: Material
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<Material>({
    ...user,
    LearningOutcome: user.LearningOutcome || initialMaterial.LearningOutcome,
    TextDocument: user.TextDocument || initialMaterial.TextDocument,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.ID)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <div className="mb-10">
        <label className="form-label">Pilih Subject</label>
        <select className="form-select" aria-label="Pilih Subject">
          <option value="0">Biologi</option>
          <option value="1">Kimia</option>
          <option value="2">Sejarah</option>
          <option value="3">Geografi</option>
        </select>
      </div>
      <div className="mb-10">
        <label className="form-label">Pilih Tingkat</label>
        <select className="form-select" aria-label="Pilih Subject">
          <option value="0">SD</option>
          <option value="1">SMP</option>
          <option value="2">SMA</option>
        </select>
      </div>      
      <div className="mb-10">
        <label className="form-label">Learning Outcome</label>
        <input
          type="text"
          className="form-control form-control-white"
          placeholder=""
        />
      </div>
      <div className="mb-10">
        <label className="form-label">Materi</label>
        <input
          type="text"
          className="form-control form-control-white"
          placeholder=""
        />
      </div>
      <div className="mb-10">
        <label className="form-label">Jumlah Pertanyaan</label>
        <input
          type="text"
          className="form-control form-control-white"
          placeholder=""
        />
      </div>          
        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}      
    </>
  )
}

export {UserEditModalForm}
