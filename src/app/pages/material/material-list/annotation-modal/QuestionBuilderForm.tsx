import {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import Mark from 'mark.js'
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Tagify from '@yaireo/tagify'

// document.onmouseup = () => {
//   const highlightText = document.getSelection()
//   const startText = highlightText?.anchorOffset as number
//   const endText = highlightText?.focusOffset as number
//   const fullText = document.getElementById('materialContent')?.innerHTML as string
//   console.log(fullText.substring(startText,endText))
// }

const QuestionBuilderForm: FC<any> = ({questFlags}) => {
  const [tags,setTags] = useState("")
  let materialText = document.getElementById('materialContent') as HTMLDivElement
  let fullText = document.getElementById('materialContent')?.innerHTML as string
  const tempTags = document.getElementById('tags') as HTMLInputElement
  const highlightTags = new Tagify(tempTags)
  const markInstance = new Mark(materialText)

  const highlightText = () => {
    // console.log(document.getSelection())
    materialText = document.getElementById('materialContent') as HTMLDivElement
    fullText = document.getElementById('materialContent')?.innerHTML as string    
    const highlightText = document.getSelection()
    const startText = highlightText?.anchorOffset as number
    const endText = highlightText?.focusOffset as number
    const lengthText = endText - startText
    // markInstance.markRanges([{
    //   start: startText,
    //   length: lengthText
    // }])

    let tagInfo = fullText.substring(startText,endText) + "[" + startText + ";" + endText + "]"
    if(tags == "") {
      setTags(tags + tagInfo)
    } else {
      setTags(tags + "," + tagInfo)
    }
  }

  highlightTags
  .on('add', e => {
    // console.log(tags)
  })
  .on('remove', e => {
    const regex = e.detail.data?.value as string
    setTags(tags.replace(regex+",",""))
    // console.log(tags)
  })

  return (
    <div className="accordion accordion-icon-toggle" id={"kt_question_" + questFlags}>
      <div className="mb-5">
        <div
          className="accordion-header py-3 d-flex"
          data-bs-toggle="collapse"
          data-bs-target={"#kt_question_item_" + questFlags}
        >
          <span className="accordion-icon">
            <KTSVG
              className="svg-icon svg-icon-4"
              path="/media/icons/duotune/arrows/arr064.svg"
            />
          </span>
          <h3 className="fs-4 text-gray-800 fw-bold mb-0 ms-4">
            Pertanyaan {questFlags}
          </h3>
        </div>
        <div
          id={"kt_question_item_" + questFlags}
          className="fs-6 collapse show ps-10"
          data-bs-parent={"#kt_question_" + questFlags}
        >
        <div className="mb-3">
          <label className="form-label">Tipe Pertanyaan</label>
          <div className="form-check form-switch form-check-custom form-check-solid me-10">
            <ButtonGroup aria-label="Basic example">
              <Button className="btn btn-bg-info" variant="secondary" data-key="1">Type 1</Button>
              <Button className="btn btn-bg-success" variant="secondary" data-key="2">Type 2</Button>
              <Button className="btn btn-bg-warning" variant="secondary" data-key="3">Type 3</Button>
              <Button className="btn btn-bg-danger" variant="secondary" data-key="4">Type 4</Button>                
            </ButtonGroup>              
          </div>                        
          <label className="form-label">Select Bagian Text yang menjadi dasar pembentuk pertanyaan</label>
          <div className="form-check form-switch form-check-custom form-check-solid me-10">
            <textarea className="form-control form-control-white" name="tags" id="tags" cols={1} rows={1} value={tags}>
            </textarea>
          </div>  
          <div className="d-flex justify-content-end py-6 px-9">
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
            </div>
        </div>
      </div>
  </div>
  )
}

export {QuestionBuilderForm}
