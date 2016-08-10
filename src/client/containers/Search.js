import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'
import { Flex, Box } from 'reflexbox'
import { SearchGrid, SearchBox } from '../components/search'
import { fetchSearch, clearPreloadedFlag } from '../actions/search'
import path from 'path'

class Search extends Component {
  static fetchData ({ store, searchParams, fetchOptions }) {
    return store.dispatch(fetchSearch(searchParams, fetchOptions))
  }

  // If there is no preloaded flag, and no results, then fetch them.  Otherwise
  // just clear the flag
  componentWillMount () {
    console.log('Search - componentWillMount')

    if (!this.props.preloaded && !this.props.results.length) {
      this.props.fetchSearch({ ...this.props.params })
    } else {
      this.props.clearPreloadedFlag()
    }
  }

  componentWillReceiveProps ({ params }) {
    console.log('Search - componentWillReceiveProps')

    if (this.props.params !== params) {
      console.info('Search - params are different')
      this.props.fetchSearch({ ...params })
    }
  }

  componentWillUpdate () {
    console.log('Search - componentWillUpdate')

  }

  componentDidMount () {
    console.log('Search - componentDidMount')
  }

  render () {
    console.log('Search - render')

    const {
      location: { pathname },
      page_number,
      params,
      results,
      userAgent,
    } = this.props

    const center = { textAlign: 'center' }
    const basePath = pathname.replace(/\/page\/.$/, '')

    const prevTo = page_number === 2
      ? basePath
      : path.normalize(`${basePath}/page/${page_number - 1}`)

    const previous = page_number > 1
      ? <Link to={prevTo}>Previous</Link>
      : null

    const nextTo = path.normalize(`${basePath}/page/${page_number + 1}`)

    const keyword = params.keyword ? `- "${params.keyword}" ` : null

    return (
      <div>
        <Flex align='center'>
          <Box col={6}>
            <h2>Search {keyword} - Page {page_number}</h2>
          </Box>
          <Box col={6}>
            <SearchBox params={params} />
          </Box>
        </Flex>
        <hr />

        <Flex>
          <Box col={4} style={center}>
            {previous}
          </Box>

          <Box col={4} style={center}>
            <IndexLink to='/'>Home</IndexLink>
          </Box>

          <Box col={4} style={center}>
            <Link to={nextTo}>Next</Link>
          </Box>
        </Flex>
        <hr />

        <SearchGrid results={results} userAgent={userAgent} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  preloaded: state.search.preloaded,
  results: state.search.results,
  page_number: +props.params.page_number || 1,
  userAgent: state.userAgent,
})

const mapDispatchToProps = dispatch => ({
  fetchSearch: (params) => dispatch(fetchSearch({ params })),
  clearPreloadedFlag: () => dispatch(clearPreloadedFlag())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
