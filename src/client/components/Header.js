import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import { connect } from 'react-redux'

const styles = {
  appbar: {
    position: 'fixed',
    left: 0,
    top: 0,
  },
  img: {
    maxHeight: '80%',
    verticalAlign: 'middle',
  }
}

function Header (props) {
  const searchIcon = (
    <IconButton onTouchTap={props.toggleSearch}>
      <Search />
    </IconButton>
  )

  return (
    <AppBar
      title={<img src='http://i.imgur.com/YYpfYrX.png' alt='Universal Soldier' style={styles.img} />}
      iconElementRight={searchIcon}
      style={styles.appbar}
    />
  )
}

const actions = {
  toggleSearch: () => ({ type: 'TOGGLE_SEARCH' })
}

export default connect(null, actions)(Header)
