import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import pick from 'lodash/pick'

const styles = {
  input: {
    fontSize: '1.5em',
    width: '100%',
  }
}

function SearchBox (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name='keyword' component={TextField} floatingLabelText='Keyword' fullWidth />
    </form>
  )
}

const form = {
  form: 'search',
  handleSubmit: (values, dispatch) => dispatch(push(`/search/${values.keyword}`)),
}

const state = (state, props) => ({
  initialValues: {
    keyword: props.params.keyword || ''
  },
})

export default compose(
  connect(state),
  reduxForm(form)
)(SearchBox)
