import React, { PropTypes } from 'react'
import { Card } from 'material-ui/Card'
import { Flex } from 'reflexbox'
import { connect } from 'react-redux'

const getStyle = styles => ({
  minHeight: '100vh',
  boxSizing: 'border-box',
  paddingTop: styles.paddingTop,
  transition: 'padding 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
})

function MainContainer (props) {
  const style = getStyle({
    paddingTop: props.paddingTop,
  })

  return (
    <Card>
      <Flex column justify='space-between' style={style}>
        {props.children}
      </Flex>
    </Card>
  )
}

const state = state => ({
  paddingTop: state.application.searchBoxVisible ? 64 : 0
})

export default connect(state)(MainContainer)

MainContainer.defaultProps = {
  paddingTop: 0,
}

MainContainer.propTypes = {
  paddingTop: PropTypes.number,
}
