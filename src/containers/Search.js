import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearch, clearPreloadedFlag } from '../actions/search'

class Search extends Component {
  static fetchData ({ store }) {
    const preloaded = true
    return store.dispatch(fetchSearch({ preloaded }))
  }

  componentWillMount () {
    if (!this.props.preloaded) {
      this.props.fetchSearch()
    }
  }

  componentDidMount () {
    // Check if the preload flag is true, and if there are results.
    if (this.props.preloaded && this.props.results) {
      this.props.clearPreloadedFlag()
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
  preloaded: state.search.preloaded,
  results: state.search.results,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: () => dispatch(fetchSearch()),
  clearPreloadedFlag: () => dispatch(clearPreloadedFlag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
