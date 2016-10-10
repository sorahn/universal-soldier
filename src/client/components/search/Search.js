import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { SearchGrid, SearchBox, Pager } from './'
import { fetchSearch, clearPreloadedFlag } from '../../actions/search'

class Search extends Component {
  static fetchData ({ store, searchParams, fetchOptions }) {
    return Promise.resolve(store.dispatch(fetchSearch(searchParams, fetchOptions)))
  }

  componentWillReceiveProps ({ params }) {
    console.log('Search - componentWillReceiveProps')

    if (this.props.params !== params) {
      console.info('Search - params are different')
      this.props.fetchSearch(params)
    }
  }

  componentDidMount () {
    console.log('Search - componentDidMount')
    this.props.fetchSearch(this.props.params)
  }

  render () {
    console.log('Search - render')

    const {
      location: { pathname },
      page_number,
      results,
    } = this.props

    return (
      <Card>
        <CardTitle title='Search Results'/>
        <SearchBox />
        <SearchGrid results={results} />
        <CardActions>
          <Pager pathname={pathname} page_number={page_number} />
        </CardActions>
      </Card>
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
