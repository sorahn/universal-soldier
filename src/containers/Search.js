import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearch, clearPreloadFlag } from '../actions/search'

class Search extends Component {
  static fetchData ({ store }) {
    const preload = true
    return store.dispatch(fetchSearch({preload}))
  }

  componentWillMount () {
    if (!this.props.preload) {
      this.props.fetchSearch()
    }
  }

  componentDidMount () {
    // Check if the preload flag is true, and if there are results.
    if (this.props.preload && this.props.results) {
      this.props.clearPreloadFlag()
    }
  }

  render () {
    return (
      <div style={{ paddingTop: 300 }}>
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
  preload: state.search.preload,
  results: state.search.results,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: () => dispatch(fetchSearch()),
  clearPreloadFlag: () => dispatch(clearPreloadFlag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
