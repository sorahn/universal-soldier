import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { Flex, Box } from 'reflexbox'

import { SearchGrid } from '../components'
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

    const {
      page_number,
      results,
    } = this.props

    const center = { textAlign: 'center' }

    return (
      <div>
        <h2>Search - Page {page_number}</h2>
        <hr />

        <Flex>
          <Box col={4} style={center}>
            {page_number > 1 &&
              <Link to={`/page/${page_number - 1}`}>Previous</Link>
            }
          </Box>
          <Box col={4} style={center}>
            <IndexLink to='/'>Home</IndexLink>
          </Box>
          <Box col={4} style={center}>
            <Link to={`/page/${page_number + 1}`}>Next</Link>
          </Box>
        </Flex>
        <hr />

        <SearchGrid results={results} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  preloaded: state.search.preloaded,
  results: state.search.results,
  page_number: +props.params.page_number || 1,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: (params) => dispatch(fetchSearch({ params })),
  clearPreloadedFlag: () => dispatch(clearPreloadedFlag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
