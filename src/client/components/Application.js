import React, { PropTypes } from 'react'
import { CardText } from 'material-ui/Card'
import { Box } from 'reflexbox'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { Header, MainContainer } from './'

injectTapEventPlugin()

function Application (props) {
  return (
    <MainContainer>
      <Header />

      {props.children}

      <Box style={{marginTop: 'auto'}}>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </CardText>
      </Box>
    </MainContainer>
  )
}

Application.propTypes = {
  children: PropTypes.node,
}

export default Application
