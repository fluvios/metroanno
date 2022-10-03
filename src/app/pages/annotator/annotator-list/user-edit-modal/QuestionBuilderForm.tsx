import {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import Mark from 'mark.js'
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

// document.onmouseup = () => {
//   const highlightText = document.getSelection()
//   const startText = highlightText?.anchorOffset as number
//   const endText = highlightText?.focusOffset as number
//   const fullText = document.getElementById('materialContent')?.innerHTML as string
//   console.log(fullText.substring(startText,endText))
// }

const QuestionBuilderForm: FC<any> = ({questFlags}) => {
  const [tags,setTags] = useState("")

  const highlightText = () => {
    const materialText = document.getElementById('materialContent') as HTMLInputElement
    const highlightText = document.getSelection()
    const startText = highlightText?.anchorOffset as number
    const endText = highlightText?.focusOffset as number
    const lengthText = endText - startText
    const fullText = document.getElementById('materialContent')?.innerHTML as string  
    const markInstance = new Mark(materialText)
    markInstance.markRanges([{
      start: startText,
      length: lengthText
    }])

    let tagInfo = fullText.substring(startText,endText) + "[" + startText + ";" + endText + "]"
    setTags(tags + "," + tagInfo)
  }

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
          <form action="">
            <div className="mb-3">
              <label className="form-label">Tipe Pertanyaan</label>
              <div className="form-check form-switch form-check-custom form-check-solid me-10">
                <ButtonGroup aria-label="Basic example">
                  <Button className="btn btn-bg-info" variant="secondary" onClick={() => highlightText()}>Type 1</Button>
                  <Button className="btn btn-bg-success" variant="secondary" onClick={() => highlightText()}>Type 2</Button>
                  <Button className="btn btn-bg-warning" variant="secondary" onClick={() => highlightText()}>Type 3</Button>
                  <Button className="btn btn-bg-danger" variant="secondary" onClick={() => highlightText()}>Type 4</Button>                
                </ButtonGroup>              
              </div>                        
              <label className="form-label">Select Bagian Text yang menjadi dasar pembentuk pertanyaan</label>
              <div className="form-check form-switch form-check-custom form-check-solid me-10">
                {/* <textarea className="form-control form-control-white" name="tags" id="tags" cols={30} rows={10} value={tags}>
                </textarea> */}
              {/* <input
                  type="text"
                  className="form-control form-control-white"
                  value={tags}
                /> */}
                <Tags name="highlightTags" className="form-control form-control-white" value={tags} />
              </div>  
              <div className="d-flex justify-content-end py-6 px-9">
                <button
                    type='reset'
                  //   onClick={() => cancel()}
                    className='btn btn-success me-3'
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
              <div className="d-flex justify-content-end py-6 px-9">
                <button
                    type='reset'
                    // onClick={() => cancel()}
                    className='btn btn-success me-3 pull-right'
                    data-kt-users-modal-action='cancel'
                    // disabled={formik.isSubmitting || isUserLoading}
                  >
                    Submit Pertanyaan
                </button>
              </div>  
            </div>
          </form>
        </div>
      </div>
  </div>
  )
}

export {QuestionBuilderForm}
