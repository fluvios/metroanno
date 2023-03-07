import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl, KTSVG} from '../../../../../_metronic/helpers'
import {Feedback, initialFeedback, MaterialQueryResponse, QuestionAnnotationRequest} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {bulkAddAnnotation, addFeedback} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {QuestionBuilderForm} from './QuestionBuilderForm'

type Props = {
  isUserLoading: boolean
  feedback: Feedback
  material: MaterialQueryResponse
}

const editFeedbackSchema = Yup.object().shape({
  document_id: Yup.number().positive().integer().required('Document Id is required'),
  feedback_text: Yup.string().required('Feedback Text is required')
})

const AnnotationEditModalForm: FC<Props> = ({feedback, material, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [inputList, setInputList] = useState<any[]>([])
  const [questFlags,setQuestFlag] = useState(1)

  const [feedbackForEdit] = useState<Feedback>({
    ...feedback,
    document_id: feedback.document_id || initialFeedback.document_id,
    feedback_text: feedback.feedback_text || initialFeedback.feedback_text,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const addQuestion = () => {
    setQuestFlag(questFlags+1)
    setInputList(inputList.concat(<QuestionBuilderForm questFlags={questFlags} />))
  }

  const addQuestionaire = (data: QuestionAnnotationRequest) => {
    try {
      bulkAddAnnotation(data)
    } catch (ex) {
      console.error(ex)
    } finally {
      cancel(true)
    }
  }

  const formik = useFormik({
    initialValues: feedbackForEdit,
    validationSchema: editFeedbackSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.document_id)) {
          addFeedback(values);
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
        <label className="form-label">Instruction</label>
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
              <div id="materialContent" className="form-control form-control-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse varius tortor quis nulla cursus vulputate. 
              Vivamus sit amet dui sollicitudin tortor placerat tincidunt. 
              Aenean rhoncus vel orci in dignissim. 
              Sed rutrum aliquam felis eget cursus. 
              Mauris interdum nibh in mi blandit, sit amet porta velit scelerisque. 
              Vestibulum turpis nunc, interdum imperdiet commodo quis, luctus vel eros. 
              Ut at convallis dolor. Vestibulum elementum leo lacus, accumsan eleifend risus bibendum non. 
              Ut imperdiet rhoncus commodo. Etiam facilisis ligula a dictum eleifend. 
              Morbi molestie risus quis enim finibus, et vestibulum libero pellentesque. 
              Sed auctor urna vel nunc efficitur sagittis. Proin porttitor luctus neque sit amet molestie. 
              Donec diam ligula, tristique lacinia ex quis, vulputate lacinia lorem. 
              Nam suscipit metus eget tristique tincidunt.
              </div>
            </div>            
          </div>
          <div className='col-md-6'>
            <div className='mb-6'>
              {inputList}
              <div className="mb-6">
                <button
                  type='button'
                  onClick={() => addQuestion()}
                  className='btn btn-secondary me-3 pull-right'
                  data-kt-users-modal-action='cancel'
                  disabled={formik.isSubmitting || isUserLoading}>
                  Tambah Pertanyaan
                </button> 
                <button
                    type='button'
                    //onClick={(data) => addQuestionaire(data)}
                    className='btn btn-success me-3 pull-right'
                    data-kt-users-modal-action='cancel'
                    // disabled={formik.isSubmitting || isUserLoading}
                  >
                    Submit Pertanyaan
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
                type='submit'
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

export {AnnotationEditModalForm}
