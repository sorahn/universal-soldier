import React, { PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import path from 'path'

export default function Pager (props) {
  const {
    page_number,
    params,
    route
  } = props

  const {
    baseParams = [],
    basePath = '/',
  } = route

  const pathParams = baseParams.map(param => String(params[param]))

  const prevLink = page_number < 3
    ? path.join(basePath, ...pathParams)
    : path.join(basePath, ...pathParams, 'page', String(page_number - 1))

  const nextLink = path.join(basePath, ...pathParams, 'page', String(page_number + 1))

  return (
    <Flex justify='space-between'>
      <Box>
        <RaisedButton
          primary
          containerElement={<Link to={prevLink} />}
          disabled={page_number === 1}
          label='previous'
        />
      </Box>
      <Box>
        <RaisedButton
          primary
          containerElement={<Link to={nextLink} onTouchTap={e => e.target.blur()} />}
          label='next'
          onTouchTap={e => { e.persist(); setImmediate(() => e.target.blur()) }}
        />
      </Box>
    </Flex>
  )
}

Pager.defaultProps = {
  page_number: 1,
}

Pager.propTypes = {
  page_number: PropTypes.number,
  param: PropTypes.object,
}
