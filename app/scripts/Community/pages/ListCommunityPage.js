import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'react-mixin'
import { Link, Navigation } from 'react-router'
import { Loading } from '../../Dashboard/components'

import { fetch } from '../actions'
import { ListItem } from '../components'


@decorate(Navigation)
class ListCommunityPage extends Component {

  componentDidMount() {
    const { isLoaded, fetch } = this.props
    if (!isLoaded) fetch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoaded && nextProps.data.length === 0) {
      this.transitionTo('/community/new')
    }

    if (nextProps.currentId) {
      this.transitionTo('/')
    }
  }

  render() {

    const { loading, isLoaded, data, user } = this.props

    return !loading ? (
      <div>
        <h1>Olá {user.first_name},</h1>
        <h2>Escolha uma das suas comunidades</h2>
        {isLoaded ? (
          <div className="rounded bg-white">
            {data && data.map(community => <ListItem community={community} />)}
          </div>
        ) : null}
        <p className="white center">ou <Link to="/community/add">Crie uma nova comunidade</Link></p>
      </div>
    ) : <Loading />
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.community.loading,
  isLoaded: state.community.isLoaded,
  data: state.community.data,
  currentId: state.community.currentId,
  credentials: state.auth.credentials
})

const mapDispatchToProps = { fetch }

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetch: () => dispatchProps.fetch(stateProps.credentials)
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListCommunityPage)
