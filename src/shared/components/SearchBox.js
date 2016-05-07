import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

function SearchBox (props) {
  return (
    <form onSubmit={props.handleSubmit(props.submitCallback)}>
      <input type='text' style={{
        fontSize: '1.5em',
        width: '100%',
      }} {...props.fields.keyword } />
    </form>
  )
}

const mapDispatchToProps = dispatch => ({
  submitCallback: ({keyword}) => dispatch(push(`/search/${keyword}`))
})

const formConfig = {
  form: 'search',
  fields: [ 'keyword' ]
}

const mapStateToForm = (state, props) => ({
  initialValues: {
    keyword: props.params.keyword
  }
})

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm(formConfig, mapStateToForm)
)(SearchBox)
