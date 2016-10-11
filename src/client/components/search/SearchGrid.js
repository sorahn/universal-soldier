import React from 'react'
import { Flex } from 'reflexbox'

import { SearchTile } from './'

const getStyles = () => ({
  flex: {
    marginLeft: -1,
    marginRight: -1,
  }
})

function SearchGrid (props, context) {
  const { results } = props
  const styles = getStyles()

  return (
    <Flex wrap style={styles.flex}>
      {results.map(result => (
        <SearchTile key={result.PerformerId} {...result} />
      ))}
    </Flex>
  )
}

SearchGrid.propTypes = {
  handleOnPerformerClick: React.PropTypes.func,
  results: React.PropTypes.array,
  thumbnailMode: React.PropTypes.string
}

SearchGrid.contextTypes = {
  reflexbox: React.PropTypes.object
}

export default SearchGrid
