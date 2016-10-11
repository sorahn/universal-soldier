import React, { PropTypes } from 'react'
import { Card } from 'material-ui/Card'
import { Flex } from 'reflexbox'
import { connect } from 'react-redux'

const getStyles = styles => ({
  flex: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    paddingTop: styles.paddingTop,
    transition: 'padding 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  }
})

function MainContainer (props) {
  const styles = getStyles({
    paddingTop: props.paddingTop,
  })

  return (
    <Card>
      <Flex column justify='space-between' style={styles}>
        {props.children}
      </Flex>
    </Card>
  )
}

const state = state => ({
  paddingTop: state.application.searchBoxVisible ? 64 : 0
})

MainContainer.defaultProps = {
  paddingTop: 0,
}

MainContainer.propTypes = {
  paddingTop: PropTypes.number,
}

export default connect(state)(MainContainer)
