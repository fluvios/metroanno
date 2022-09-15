import {KTSVG} from '../../../../../_metronic/helpers'


const QuestionBuilderForm = () => {
  return (
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
                //   onClick={() => cancel()}
                  className='btn btn-success me-3 pull-right'
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
        </form>
      </div>
    </div>
  </div>
  )
}

export {QuestionBuilderForm}
