import React from 'react'
import { Flex } from 'reflexbox'

import { SearchTile } from './'
// const statusColors = {
//   goldshow: 'gold',
//   online: '#33CC00',
//   partychat: '#33CC00',
//   specialshow: '#0099FF'
// }

// // Search styles stolen from streamate.
// const styles = {
//   container: {
//     borderBottomStyle: 'solid',
//     borderBottomWidth: 4,
//     boxShadow: '0 1px 1px rgba(0, 0, 0, 0.75)',
//     boxSizing: 'border-box',
//     paddingTop: '75%', // Sets a 4x3 ratio for the size
//     position: 'relative'
//   },
//   fill: {
//     height: '100%',
//     left: 0,
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//   },
//   img: {
//     display: 'block',
//     width: '100%',
//     height: '100%',
//   },
//   nameBar: {
//     background: 'rgba(0, 0, 0, 0.5)',
//     bottom: 0,
//     color: 'white',
//     fontSize: 12,
//     height: 16,
//     left: 0,
//     padding: '0 5px',
//     position: 'absolute',
//     textShadow: '0.5px 0.5px 1px black',
//     width: '100%'
//   }
// }

function SearchGrid (props, context) {
  const { results } = props

  // This is the best argument I have against only inline styles, and
  // server-side rendering.  With out using something that actually injects
  // a real stylesheet into the DOM then the number of columns to display
  // comes from javascript, and cannot be accurately estimated from the
  // user agent.  If this were a real CSS implemtation of grid columns, the
  // server would be agnostic of the columns.
  return (
    <Flex wrap style={{marginLeft: -1, marginRight: -1}}>
      {results.map(result => <SearchTile key={result.PerformerId} {...result} />)}
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
