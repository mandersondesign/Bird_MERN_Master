import React from 'react'
import { connect } from 'react-redux'
import { getPlansTemplates, createPlan } from 'modules/library/library-actions'
import { getAthletesMeta } from 'modules/sidenav/sidenav-actions'
import { EcoForm, EcoFormInput } from 'components'
import { Button } from 'components/CustomButton'
import css from './index.less'

const NewPlan = ({ createPlan, getPlansTemplates, getAthletesMeta, clickPopover }) => {
  const onSubmit = async e => {
    const { name } = e.fields
    if (!e.errors) {
      await createPlan({ name })
      e.onSuccess()
      getAthletesMeta()
      clickPopover()
      getPlansTemplates()
    }
  }

  return (
    <div className={css.wrapperNewPlan}>
      <div className={css.title}>Create New Template</div>

      <EcoForm onSubmit={onSubmit}>
        <div className={css.formInput}>
          <EcoFormInput
            options={{
              rules: [
                { required: true, whitespace: true, message: 'Name can not be empty.' },
              ],
            }}
            label={'TEMPLATE\'S NAME'}
            autoComplete='off'
            placeholder=''
            name='name'
          />
        </div>

        <div className={css.actions}>
          <Button size={Button.SIZE_MEDIUM} face={Button.FACE_PRIMARY} className={css.button} type='submit'>
            create
          </Button>
          <Button size={Button.SIZE_MEDIUM} face={Button.FACE_LINK} className={css.button} type='reset' onClick={clickPopover}>
            cancel
          </Button>
        </div>
      </EcoForm>
    </div>
  )
}

const mapDispatchToProps = () => dispatch => ({
  getPlansTemplates: () => dispatch(getPlansTemplates()),
  createPlan: data => dispatch(createPlan(data)),
  getAthletesMeta: () => dispatch(getAthletesMeta()),
})

export default connect(null, mapDispatchToProps)(NewPlan)
