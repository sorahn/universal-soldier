import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import { connect } from 'react-redux'
import { toggleSearchBox } from '../actions/application'
import { black } from 'material-ui/styles/colors'
import { IndexLink } from 'react-router'

const getStyles = styles => ({
  appbar: {
    backgroundColor: styles.backgroundColor,
    left: 0,
    position: 'fixed',
    top: 0,
  },
  img: {
    lineHeight: 64,
    marginTop: 8,
    maxHeight: 48,
    verticalAlign: 'top',
  },
})

function Header (props) {
  const searchIcon = (
    <IconButton onTouchTap={props.toggleSearchBox}>
      <Search />
    </IconButton>
  )

  const styles = getStyles({
    backgroundColor: black
  })

  return (
    <AppBar
      title={<IndexLink to='/'><img src='http://i.imgur.com/txdutzQ.png' alt='Universal Soldier' style={styles.img} /></IndexLink>}
      iconElementRight={searchIcon}
      style={styles.appbar}

    />
  )
}

const actions = { toggleSearchBox }

export default connect(null, actions)(Header)
