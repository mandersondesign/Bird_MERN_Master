import React from 'react'
import { connect } from 'react-redux'
import { librarySelector } from 'modules/library/library-selectors'
import { setNewPhase } from 'modules/library/library-actions'
import { Button } from 'antd'
import css from './index.less'

const BtnAddNewPhase = props => {
  const { library: { isNewPhase }, setNewPhase } = props

  const onClick = () => !isNewPhase && setNewPhase(true)

  return (
    <Button className={css.buttonNewPhase} onClick={onClick}>
      add phase
    </Button>
  )
}

const mapStateToProps = state => ({
  library: librarySelector(state),
})

const mapDispatchToProps = () => dispatch => ({
  setNewPhase: bool => dispatch(setNewPhase(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BtnAddNewPhase)
