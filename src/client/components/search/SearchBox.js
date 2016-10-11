import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

function SearchBox (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name='keyword' component={TextField} floatingLabelText='Keyword' fullWidth />
    </form>
  )
}

const form = {
  form: 'search',
  onSubmit: (values, dispatch) => dispatch(push(`/search/${values.keyword}`)),
}

const state = (state, props) => ({
  initialValues: {
    keyword: props.keyword
  },
})

SearchBox.defaultProps = {
  keyword: '',
}

export default compose(
  connect(state),
  reduxForm(form)
)(SearchBox)
