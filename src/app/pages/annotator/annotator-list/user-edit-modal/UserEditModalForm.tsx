import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl, KTSVG} from '../../../../../_metronic/helpers'
import {initialUser, QuestionAnnotation} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
// import {QuestionBuilderForm} from '../../annotator-list/user-edit-modal/QuestionBuilderForm'

type Props = {
  isUserLoading: boolean
  user: QuestionAnnotation
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

const Input = () => {
  return <input placeholder="Your input here" />;
}

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [inputList, setInputList] = useState([])

  const [userForEdit] = useState<QuestionAnnotation>({
    ...user,
    QuestionText: user.QuestionText || initialUser.QuestionText,
    AnswerText: user.AnswerText || initialUser.AnswerText,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const addQuestion = () => {
    setInputList(inputList.concat(<Input key={} />))
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
      <div className="mb-12">
        <label className="form-label">Learning Outcome</label>
        <input
          type="text"
          className="form-control form-control-white"
          placeholder=""
        />
      </div>
      <div className="col-md-12">
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-6'>
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control form-control-white"
                placeholder=""
                disabled
              />
            </div>
            <div className='mb-6'>
              <label className="form-label">Learning Outcomes</label>
              <input
                type="text"
                className="form-control form-control-white"
                placeholder=""
              />
            </div>
            <div className='mb-6'>
              <label className="form-label">Materi</label>
              <input
                type="text"
                className="form-control form-control-white"
                placeholder=""
              />
            </div>            
          </div>
          <div className='col-md-6'>
            <div className='mb-6'>
              {inputList}
              <div className="mb-6">
                <button
                  type='reset'
                  onClick={() => addQuestion()}
                  className='btn btn-success me-3 pull-right'
                  data-kt-users-modal-action='cancel'
                  disabled={formik.isSubmitting || isUserLoading}>
                  Tambah Pertanyaan
                </button>                                                                      
              </div>
              <div className="mb-6">
                <label className="form-label">Feedback Catatan</label>
                <input
                  type="text"
                  className="form-control form-control-white"
                  placeholder=""
                />
              </div>
              <button
                type='reset'
                onClick={() => cancel()}
                className='btn btn-light me-3 pull-right'
                data-kt-users-modal-action='cancel'
                disabled={formik.isSubmitting || isUserLoading}
              >
                Submit Feedback
              </button>              
            </div>            
          </div>
        </div>
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
            Anotasi Materi Berikutnya
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Selesai/Kembali ke Dashboard</span>
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
