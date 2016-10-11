import React, { PropTypes } from 'react'

const getStyles = styles => ({
  inner: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  root: {
    overflow: styles.overflow,
    paddingTop: `${styles.ratio}%`,
    position: 'relative',
    width: '100%',
  },
})

export default function RatioBox (props) {
  const {
    children,
    height,
    overflow,
    width,
  } = props

  const ratio = height / width * 100
  const styles = getStyles({ overflow, ratio })

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
