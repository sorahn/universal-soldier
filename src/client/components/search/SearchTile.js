import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Box } from 'reflexbox'
import { GridTile } from 'material-ui/GridList'

import { RatioBox } from '../'

const getStyles = () => ({
  box: {
    padding: 1,
  },
  img: {
    width: '100%'
  }
})

export default function SearchTile (props) {
  const {
    PerformerId,
    Nickname,
  } = props

  const src = `//m1.nsimg.net/biopic/320x240/${PerformerId}`
  const styles = getStyles()

  return (
    <Box auto col={6} sm={6} md={4} lg={3} style={styles.box}>
      <RatioBox>
        <GridTile
          containerElement={<Link to={`/cam/${Nickname}`} />}
          children={<img src={src} alt={Nickname} style={styles.img} />}
          title={Nickname}
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        />
      </RatioBox>
    </Box>
  )
}

SearchTile.propTypes = {
  PerformerId: PropTypes.number,
  Age: PropTypes.number,
  Country: PropTypes.string,
  StatusKey: PropTypes.string,
  Nickname: PropTypes.string,
}
