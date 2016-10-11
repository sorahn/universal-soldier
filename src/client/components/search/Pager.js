import React, { PropTypes } from 'react'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router'
import { RaisedButton } from '../'
import path from 'path'

const onTouchTap = e => {
  e.persist()
  event = document.createEvent('mouseleave')
  setTimeout(() => e.target.dispatchEvent(event), 500)
}

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

  // Just link back to the base path instead of '/page/1'
  const prevLinkPath = page_number <= 2
    ? path.join(basePath, ...pathParams)
    : path.join(basePath, ...pathParams, 'page', String(page_number - 1))

  const prevLinkDisabled = page_number === 1

  const prevLink = prevLinkDisabled ? <span /> : <Link to={prevLinkPath} />

  const nextLinkPath = path.join(basePath, ...pathParams, 'page', String(page_number + 1))

  return (
    <Flex justify='space-between'>
      <Box>
        <RaisedButton
          primary
          containerElement={prevLink}
          disabled={prevLinkDisabled}
          label='previous'
        />
      </Box>
      <Box>
        <RaisedButton
          primary
          containerElement={<Link to={nextLinkPath} onTouchTap={onTouchTap} />}
          label='next'
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
