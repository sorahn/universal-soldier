import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardTitle, CardActions, CardText } from 'material-ui/Card'
import { SearchGrid, SearchBox, Pager } from './'
import { fetchSearch } from '../../actions/search'

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
      params,
      results,
    } = this.props

    return (
      <div>
        <CardTitle title='Search Results'/>
        <CardText style={{paddingTop: 0}}>
          <SearchBox keyword={params.keyword} />
        </CardText>
        <SearchGrid results={results} />
        <CardActions>
          <Pager pathname={pathname} page_number={page_number} />
        </CardActions>
      </div>
    )
  }
}

const state = (state, props) => ({
  preloaded: state.search.preloaded,
  results: state.search.results,
  page_number: Number(props.params.page_number) || 1,
})

const actions = { fetchSearch }

export default connect(state, actions)(Search)
