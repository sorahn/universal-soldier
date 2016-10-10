import React from 'react'
import { Flex, Box } from 'reflexbox'
import { IndexLink, Link } from 'react-router'
import path from 'path'

export default function Pager (props) {
  const { pathname, page_number } = props

  const center = { textAlign: 'center' }
  const basePath = pathname.replace(/\/page\/.$/, '')

  const prevTo = page_number === 2
    ? basePath
    : path.normalize(`${basePath}/page/${page_number - 1}`)

  const previous = page_number > 1
    ? <Link to={prevTo}>Previous</Link>
    : null

  const nextTo = path.normalize(`${basePath}/page/${page_number + 1}`)

  return (
    <Flex>
      <Box col={4} style={center}>
        {previous}
      </Box>

      <Box col={4} style={center}>
        <IndexLink to='/'>Home</IndexLink>
      </Box>

      <Box col={4} style={center}>
        <Link to={nextTo}>Next</Link>
      </Box>
    </Flex>
  )
}
