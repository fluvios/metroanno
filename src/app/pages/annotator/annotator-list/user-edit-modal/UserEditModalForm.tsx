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

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

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
              <div className="accordion accordion-icon-toggle" id="kt_accordion_2">
                <div className="mb-5">
                  <div
                    className="accordion-header py-3 d-flex"
                    data-bs-toggle="collapse"
                    data-bs-target="#kt_accordion_2_item_1"
                  >
                    <span className="accordion-icon">
                      <KTSVG
                        className="svg-icon svg-icon-4"
                        path="/media/icons/duotune/arrows/arr064.svg"
                      />
                    </span>
                    <h3 className="fs-4 text-gray-800 fw-bold mb-0 ms-4">
                      Pertanyaan 1
                    </h3>
                  </div>
                  <div
                    id="kt_accordion_2_item_1"
                    className="fs-6 collapse show ps-10"
                    data-bs-parent="#kt_accordion_2"
                  >
                    <form action="">
                      <div className="mb-3">
                        <label className="form-label">Tipe Pertanyaan</label>
                        <div className="form-check form-switch form-check-custom form-check-solid me-10">
                          <a href="#" className="btn btn-bg-info">Type 1</a>
                          <a href="#" className="btn btn-bg-success">Type 2</a>
                          <a href="#" className="btn btn-bg-warning">Type 3</a>
                          <a href="#" className="btn btn-bg-danger">Type 4</a>
                        </div>                        
                        <label className="form-label">Select Bagian Text yang menjadi dasar pembentuk pertanyaan</label>
                        <div className="form-check form-switch form-check-custom form-check-solid me-10">
                          <input
                            type="text"
                            className="form-control form-control-white"
                            placeholder=""
                          />
                        </div>  
                        <div className="mb-3">
                          <button
                              type='reset'
                              onClick={() => cancel()}
                              className='btn btn-success me-3 pull-right'
                              data-kt-users-modal-action='cancel'
                              disabled={formik.isSubmitting || isUserLoading}
                            >
                              Selesai Highlight
                          </button>                                                                      
                        </div>
                        <label className="form-label">Tulis Pertanyaan</label>
                        <div className="form-check form-switch form-check-custom form-check-solid me-10">
                          <input
                            type="text"
                            className="form-control form-control-white"
                            placeholder=""
                          />
                        </div>                                                
                        <label className="form-label">Tulis Jawaban yang diharapkan</label>
                        <div className="form-check form-switch form-check-custom form-check-solid me-10">
                          <input
                            type="text"
                            className="form-control form-control-white"
                            placeholder=""
                          />
                        </div>  
                        <button
                            type='reset'
                            onClick={() => cancel()}
                            className='btn btn-success me-3 pull-right'
                            data-kt-users-modal-action='cancel'
                            disabled={formik.isSubmitting || isUserLoading}
                          >
                            Submit Pertanyaan
                        </button>                                                                      
                      </div>
                    </form>
                  </div>
                </div>
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
