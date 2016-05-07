import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { fetchSearch, clearPreloadedFlag } from '../actions/search'

class Search extends Component {
  static fetchData ({ store, params }) {
    const preloaded = true
    return store.dispatch(fetchSearch({ preloaded, params }))
  }

  componentWillMount () {
    console.info('Search - componentWillMount')

    if (!this.props.preloaded) {
      this.props.fetchSearch({ ...this.props.params })
    }
  }

  componentWillReceiveProps ({ params = {} }) {
    console.info('Search - componentWillReceiveProps')

    if (this.props.params !== params) {
      console.info('Search - params are different')
      this.props.fetchSearch({ ...params })
    }
  }

  componentDidMount () {
    console.info('Search - componentDidMount')

    // Check if the preload flag is true, and if there are results.
    if (this.props.preloaded && this.props.results) {
      this.props.clearPreloadedFlag()
    }
  }

  render () {
    console.info('Search - render')
    return (
      <div>
        <h2>Search</h2>
        <hr />

        <ul>
          {this.props.results.map((result => (
            <li key={result.PerformerId}>
              {result.Nickname}
            </li>
          )))}
        </ul>
        <hr />
        <IndexLink to='/'>Home</IndexLink>&nbsp;
        <Link to='/page/2'>Next</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  preloaded: state.search.preloaded,
  results: state.search.results,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: (params) => dispatch(fetchSearch({ params })),
  clearPreloadedFlag: () => dispatch(clearPreloadedFlag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
