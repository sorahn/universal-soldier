import React, { PropTypes } from 'react'

export default function RatioBox (props) {
  const {
    children,
    height,
    overflow,
    width,
  } = props

  const ratio = height / width * 100

  const styles = {
    root: {
      overflow,
      paddingTop: `${ratio}%`,
      position: 'relative',
      width: '100%',
    },
    inner: {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    }
  }

  return (
    <div className='RatioBox' style={styles.root}>
      <div style={styles.inner}>
        {children}
      </div>
    </div>
  )
}

RatioBox.defaultProps = {
  overflow: 'hidden',
  height: 3,
  width: 4,
}

RatioBox.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  overflow: PropTypes.string,
  width: PropTypes.number,
}
