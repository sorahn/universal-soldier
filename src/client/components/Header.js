import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import { connect } from 'react-redux'
import { toggleSearchBox } from '../actions/application'
import { black } from 'material-ui/styles/colors'

const styles = {
  appbar: {
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: black,
  },
  img: {
    maxHeight: 48,
    lineHeight: 64,
    marginTop: 8,
    verticalAlign: 'top',
  }
}

function Header (props) {
  const searchIcon = (
    <IconButton onTouchTap={props.toggleSearchBox}>
      <Search />
    </IconButton>
  )

  return (
    <AppBar
      title={<img src='http://i.imgur.com/txdutzQ.png' alt='Universal Soldier' style={styles.img} />}
      iconElementRight={searchIcon}
      style={styles.appbar}

    />
  )
}

const actions = { toggleSearchBox }

export default connect(null, actions)(Header)
