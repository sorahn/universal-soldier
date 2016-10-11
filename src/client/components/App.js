import React, { PropTypes } from 'react'
import Card from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'

import logo from '../../assets/universal-soldier.png'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

function App (props) {
  console.log(logo)

  const searchIcon = (
    <IconButton onTouchTap={e => console.log(e)}>
      <Search />
    </IconButton>
  )

  return (
    <Card>
      <AppBar
        title='Universal React Test'
        iconElementRight={searchIcon}
      />

      {props.children}

      <br /><br />

    </Card>
  )
}

App.propTypes = {
  children: PropTypes.node,
}

export default App
