import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {HiChevronRight} from 'react-icons/hi'
import {QuestionAnnotation} from '../core/_models'

const AnnotationBuilder: React.FC<{
  questFlags: number
  setAnnotation: React.Dispatch<React.SetStateAction<QuestionAnnotation[]>>
}> = ({questFlags, setAnnotation}) => {
  const [tags, setTags] = useState('')

  const highlightText = () => {
    const fullText = document.getElementById('materialContent')?.innerHTML as string
    const highlightText = document.getSelection()
    const startText = highlightText?.anchorOffset as number
    const endText = highlightText?.focusOffset as number

    let tagInfo = fullText.substring(startText, endText) + '[' + startText + ';' + endText + ']'
    if (tags === '') {
      setTags(tags + tagInfo)
    } else {
      setTags(tags + ',' + tagInfo)
    }
  }

  const handleChangeKeywords = (text: string) => {
    setAnnotation((prev) => {
      return prev.map((p) => {
        if (p.question_type_id === questFlags) {
          return {
            ...p,
            keywords: text,
          }
        }
        return p
      })
    })
  }

  const handleChangeQuestion = (text: string) => {
    setAnnotation((prev) => {
      return prev.map((p) => {
        if (p.question_type_id === questFlags) {
          return {
            ...p,
            question_text: text,
          }
        }
        return p
      })
    })
  }

  const handleChangeAnswer = (text: string) => {
    setAnnotation((prev) => {
      return prev.map((p) => {
        if (p.question_type_id === questFlags) {
          return {
            ...p,
            answer_text: text,
          }
        }
        return p
      })
    })
  }

  useEffect(() => {
    handleChangeKeywords(tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  return (
    <div className='accordion accordion-icon-toggle' id={'kt_question_' + questFlags}>
      <div
        className='mb-5 border'
        style={{
          borderRadius: '6px',
        }}
      >
        <div
          className='accordion-header py-3 d-flex px-2 bg-opacity-30 bg-gray-200'
          data-bs-toggle='collapse'
          data-bs-target={'#kt_question_item_' + questFlags}
          style={{
            borderRadius: '4px',
          }}
        >
          <span className='accordion-icon'>
            <HiChevronRight />
          </span>
          <h3 className='fs-4 text-gray-800 fw-bold mb-0 ms-4'>Pertanyaan {questFlags}</h3>
        </div>
        <div
          id={'kt_question_item_' + questFlags}
          className='fs-6 collapse show p-6'
          data-bs-parent={'#kt_question_' + questFlags}
        >
          <div className=''>
            <label className='form-label'>Tipe Pertanyaan</label>
            <div className='form-check form-switch form-check-custom form-check-solid mb-10'>
              <ButtonGroup aria-label='Basic example'>
                <Button className='btn btn-bg-info' variant='secondary' data-key='1'>
                  Type 1
                </Button>
                <Button className='btn btn-bg-success' variant='secondary' data-key='2'>
                  Type 2
                </Button>
                <Button className='btn btn-bg-warning' variant='secondary' data-key='3'>
                  Type 3
                </Button>
                <Button className='btn btn-bg-danger' variant='secondary' data-key='4'>
                  Type 4
                </Button>
              </ButtonGroup>
            </div>
            <label className='form-label'>
              Select Bagian Text yang menjadi dasar pembentuk pertanyaan
            </label>
            <div className='form-check form-switch form-check-custom form-check-solid'>
              <textarea
                className='form-control form-control-white'
                name='tags'
                id='tags'
                cols={1}
                rows={3}
                value={tags}
              ></textarea>
            </div>
            <div className='d-flex justify-content-end mt-4 mb-6'>
              <button
                type='button'
                onClick={() => highlightText()}
                className='btn btn-success me-3'
              >
                Tambah Highlight
              </button>
              <button
                type='reset'
                //   onClick={() => cancel()}
                className='btn btn-info me-3'
                data-kt-users-modal-action='cancel'
                //   disabled={formik.isSubmitting || isUserLoading}
              >
                Selesai Highlight
              </button>
            </div>
            <label className='form-label'>Tulis Pertanyaan</label>
            <div className='form-check form-switch form-check-custom form-check-solid mb-6'>
              <input
                type='text'
                className='form-control form-control-white'
                placeholder=''
                onChange={(e) => {
                  handleChangeQuestion(e.target.value)
                }}
              />
            </div>
            <label className='form-label'>Tulis Jawaban yang diharapkan</label>
            <div className='form-check form-switch form-check-custom form-check-solid mb-3'>
              <input
                type='text'
                className='form-control form-control-white'
                placeholder=''
                onChange={(e) => {
                  handleChangeAnswer(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnotationBuilder
