import {FC, useEffect, useState} from 'react'
import {Feedback, MaterialQueryResponse, QuestionAnnotation} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import AnnotationBuilder from './AnnotationBuilder'
import { bulkAddAnnotation, randomDocument } from '../core/_requests'
import React from 'react'
import { useQuery } from 'react-query'

type Props = {
  isUserLoading: boolean
  feedback: Feedback
  material: MaterialQueryResponse
}

const AnnotationEditModalFormNew: FC<Props> = ({feedback, material, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [questFlags, setQuestFlag] = useState(0)

  const [annotations, setAnnotations] = useState<Array<QuestionAnnotation>>([])
  const [showLearningOutcome, setShowLearingOutcome] = useState(true)
  const [startOpen, setStartOpen] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setStartOpen(Date.now())
  }, [])

  const {
    isLoading,
    data: document,
    error,
  } = useQuery(
    ``,
    () => {
      return randomDocument()
    },
    {
      cacheTime: 0,
      onSuccess: (data) => {
        
      },
      onError: (err) => {
        console.error(err)
      },
    }
  )

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const addQuestion = () => {
    setQuestFlag(questFlags + 1)
    setAnnotations([
      ...annotations,
      {
        question_type_id: questFlags,
      },
    ])
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    const req = {
      document_id: 1,
      is_learning_outcome_shown: showLearningOutcome,
      time_duration: ~~((Date.now() - startOpen)/100),
      question_annotations: annotations
    }
    // alert(JSON.stringify(req))

    try {
      bulkAddAnnotation(req)
    } catch (ex) {
      console.error(ex)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form id='kt_modal_add_feedback_form' className='form' onSubmit={handleSubmit} noValidate>
        <div className='col-md-12'>
          <div className='row'>
            <div className='col-md-6 sticky top-0'>
              <div className='mb-6'>
                <label className='form-label'>Subject</label>
                <input
                  type='text'
                  className='form-control form-control-white'
                  // TODO: Integrate to API
                  placeholder='Title dari API'
                  disabled
                />
              </div>
              <div className='mb-6'>
                <label className='form-label'>Materi</label>
                <div id='materialContent' className='form-control form-control-white'>
                  {document?.data?.text_document}
                </div>
              </div>
              <div className='mb-12'>
                <label className='form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack'>
                  <span className='form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2'>
                    Show Learning Outcome
                  </span>
                  <input
                    className='form-check-input cursor-pointer'
                    type='checkbox'
                    value='1'
                    defaultChecked
                    checked={showLearningOutcome}
                    readOnly
                    onClick={() => {
                      setShowLearingOutcome(!showLearningOutcome)
                    }}
                  />
                </label>
                {document?.data?.learning_outcome}
              </div>
              <hr />
              <button
                type='submit'
                //onClick={(data) => addQuestionaire(data)}
                className='btn btn-success me-3 pull-right mt-12'
                data-kt-users-modal-action='cancel'
                disabled={isSubmitting || isUserLoading}
              >
                Submit Pertanyaan
              </button>
            </div>
            <div className='col-md-6'>
              <div className='mb-6'>
                {Array(questFlags)
                  .fill(0)
                  .map((_item, idx) => {
                    return (
                      <AnnotationBuilder
                        questFlags={idx}
                        key={idx}
                        setAnnotation={setAnnotations}
                      />
                    )
                  })}
                <div className='mb-6'>
                  <button
                    type='button'
                    onClick={() => addQuestion()}
                    className='btn btn-secondary me-3 pull-right'
                    data-kt-users-modal-action='cancel'
                    disabled={isSubmitting || isUserLoading}
                  >
                    Tambah Pertanyaan
                  </button>
                </div>
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
            disabled={isSubmitting || isUserLoading}
          >
            Anotasi Materi Berikutnya
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || isSubmitting}
          >
            <span className='indicator-label'>Selesai/Kembali ke Dashboard</span>
            {(isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
    </>
  )
}

export {AnnotationEditModalFormNew}
