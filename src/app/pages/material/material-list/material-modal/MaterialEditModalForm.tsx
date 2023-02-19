import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialMaterial, Material} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createDocument, editDocument} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isMaterialLoading: boolean
  material: Material
}

const materialSchema = Yup.object({
  subject_id: Yup.number().positive().integer().required('Subject Id is required'),
  learning_outcome: Yup.string().required('Learning Outcome is required'),
  text_document: Yup.string().required('Text Document is required'),
  min_number_of_questions: Yup.number().positive().integer().required('Minimum Question is required'),
})

const MaterialEditModalForm: FC<Props> = ({material, isMaterialLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [materialForEdit] = useState<Material>({
    ...material,
    subject_id: material.subject_id || initialMaterial.subject_id,
    learning_outcome: material.learning_outcome || initialMaterial.learning_outcome,
    text_document: material.text_document || initialMaterial.text_document,
    min_number_of_questions: material.min_number_of_questions || initialMaterial.min_number_of_questions
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: materialForEdit,
    validationSchema: materialSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)

      const formMaterial = materialSchema.cast({
        subject_id: values.subject_id,
        learning_outcome: values.learning_outcome,
        text_document: values.text_document,
        min_number_of_questions: values.min_number_of_questions
      })

      try {
        if (isNotEmpty(values.id)) {
          await editDocument(formMaterial)
        } else {
          console.log(formMaterial)
          await createDocument(formMaterial)
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
      <form id='kt_modal_add_material_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-10">
          <label className="form-label">Pilih Subject</label>
          <select 
            className="form-select" 
            aria-label="Pilih Subject" 
            {...formik.getFieldProps('subject_id')} 
            onChange={formik.handleChange}>
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
            {...formik.getFieldProps('learning_outcome')}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-10">
          <label className="form-label">Materi</label>
          <input
            type="text"
            className="form-control form-control-white"
            placeholder=""
            {...formik.getFieldProps('text_document')}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-10">
          <label className="form-label">Jumlah Pertanyaan</label>
          <input
            type="text"
            className="form-control form-control-white"
            placeholder=""
            {...formik.getFieldProps('min_number_of_questions')}
            onChange={formik.handleChange}            
          />
        </div>          
          {/* begin::Actions */}
          <div className='text-center pt-15'>
            <button
              type='reset'
              onClick={() => cancel()}
              className='btn btn-light me-3'
              data-kt-users-modal-action='cancel'
              disabled={formik.isSubmitting || isMaterialLoading}
            >
              Discard
            </button>

            <button
              type='submit'
              className='btn btn-primary'
              data-kt-users-modal-action='submit'
              disabled={isMaterialLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              <span className='indicator-label'>Submit</span>
              {(formik.isSubmitting || isMaterialLoading) && (
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
        {(formik.isSubmitting || isMaterialLoading) && <ListLoading />}
    </>
  )
}

export {MaterialEditModalForm}
