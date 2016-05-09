import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Link } from 'react-router'

const statusColors = {
  goldshow: 'gold',
  online: '#33CC00',
  partychat: '#33CC00',
  specialshow: '#0099FF'
}

// Search styles stolen from streamate.
const styles = {
  container: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 4,
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.75)',
    boxSizing: 'border-box',
    paddingTop: '75%', // Sets a 4x3 ratio for the size
    position: 'relative'
  },
  fill: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  nameBar: {
    background: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    color: 'white',
    fontSize: 12,
    height: 16,
    left: 0,
    padding: '0 5px',
    position: 'absolute',
    textShadow: '0.5px 0.5px 1px black',
    width: '100%'
  }
}

// This is doing exactly what it says.  Guessing how many columns to render
// based on your user agent. We might have to investigate using CSS modules
// for the flexbox search layouts instead of inline styles.
const guessColsFromUserAgent = ({ isDesktop, isMobile, isTablet }) => {
  switch (true) {
    case isDesktop: return 3
    case isMobile: return 6
    case isTablet: return 4
  }
}

function SearchGrid (props, context) {
  const {
    results,
    userAgent,
  } = props

  // This is the best argument I have against only inline styles, and
  // server-side rendering.  With out using something that actually injects
  // a real stylesheet into the DOM then the number of columns to display
  // comes from javascript, and cannot be accurately estimated from the
  // user agent.  If this were a real CSS implemtation of grid columns, the
  // server would be agnostic of the columns.
  const col = __SERVER__ ? guessColsFromUserAgent(userAgent) : 6

  return (
    <Flex wrap gutter={1}>
      {results.map(result => {
        // {
        //   "PerformerId": 5814046,
        //   "Age": 31,
        //   "Country": "US",
        //   "StatusKey": "goldshow",
        //   "Nickname": "JennyCouture"
        // }

        // merge the static styles with the dymanic border color for the
        // status line
        const containerStyle = {
          ...styles.container,
          borderBottomColor: statusColors[result.StatusKey]
        }

        const src = `//m1.nsimg.net/biopic/320x240/${result.PerformerId}`

        return (
          <Box auto key={result.PerformerId} col={col} sm={6} md={4} lg={3} p={1}>
            <Link to={`/cam/${result.Nickname}`}>
              <div style={containerStyle}>
                <div style={styles.fill}>
                  <img src={src} style={styles.img} width={320} height={240} />
                </div>
                <Flex style={styles.nameBar} justify='space-between'>
                  <div>{result.Nickname}</div>
                  <div>{result.Age} - {result.Country}</div>
                </Flex>
              </div>
            </Link>
          </Box>
        )
      })}
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
