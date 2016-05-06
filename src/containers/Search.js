import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearch } from '../actions/search'

class Search extends Component {
  componentWillMount () {
    this.props.fetchSearch()
  }

  render () {
    return (
      <div style={{
        paddingTop: 300
      }}>
        Search

        <ul>
          {this.props.results.map((result => (
            <li key={result.PerformerId}>
              {result.Nickname}
            </li>
          )))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  results: state.search.results,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: () => dispatch(fetchSearch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
