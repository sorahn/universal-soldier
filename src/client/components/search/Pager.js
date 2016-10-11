import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import path from 'path'

export default function Pager (props) {
  const { pathname, page_number } = props

  const basePath = pathname.replace(/\/page\/.$/, '/')

  const prevLink = page_number < 3
    ? basePath
    : path.join(basePath, 'page', String(page_number - 1))

  const nextLink = path.join(basePath, 'page', String(page_number + 1))

  return (
    <Flex justify='space-between'>
      <Box>
        <RaisedButton
          primary
          containerElement={<Link to={prevLink} />}
          disabled={page_number === 1}
          label='previous'
          onTouchTap={e => e.target.blur()}
        />
      </Box>
      <Box>
        <RaisedButton
          primary
          containerElement={<Link to={nextLink} />}
          label='next'
          onTouchTap={e => e.target.blur()}
        />
      </Box>
    </Flex>
  )
}

Pager.defaultProps = {
  page_number: 1,
}
