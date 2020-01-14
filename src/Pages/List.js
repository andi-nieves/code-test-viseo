import React from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '../Redux/Module';
import { Container, FormControl, Button, Table } from 'react-bootstrap';
import { debounce, get } from 'lodash';
import '../App.css';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import useAxios from 'axios-hooks'

function List({ history, signout }) {
  const [query, setQuery] = React.useState('a')
  const [page, setPage] = React.useState(1);
  const searchInput = React.useRef(null);
  const [{ data, loading }] = useAxios(`https://api.github.com/search/repositories?q=${query}&sort=star&order=asc&per_page=50&page=${page}`)
  const visitUser = url => window.location = url
  const renderItems = () => {
    if (!data && loading) {
      return <tr><td colSpan={3}><i className="fa fa-spinner fa-spin" /></td></tr>
    }
    return get(data, 'items', []).map(details => {
      return (
        <tr key={details.id}>
          <td><Button onClick={() => history.push('/details', details)} variant="link">{details.name}</Button></td>
          <td>{details.description}</td>
          <td>
            <Button onClick={() => visitUser(details.owner.html_url)} variant="link"><img alt="avatar" src={details.owner.avatar_url} className="avatar" /> <span>{details.owner.login}</span></Button>
          </td>
        </tr>
      )
    })
  }
  const queryHandler = value => {
    debounce(() => {
      setQuery(value)
    }, 400)()
  }
  useBottomScrollListener(() => {
    debounce(() => {
      setPage(page + 1)
    }, 500)()
  });
  const signOut = () => {
    signout()
  }
  return (
    <Container>
      <h1>Repositories</h1>
      <Button onClick={signOut} variant="link" style={{ float: 'right', marginTop: -60}}><h1><i className="fa fa-sign-out sign-out" /></h1></Button>
      <FormControl
        ref={searchInput}
        placeholder="Search..."
        aria-label="Search"
        onChange={e => queryHandler(e.target.value)}
      />

      <Table responsive striped bordered hover variant="light">
        <thead>
          <tr>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>OWNER</th>
          </tr>
        </thead>
        <tbody>
          {renderItems()}
        </tbody>
      </Table>
      {(data && loading) && <i className="fa fa-spinner fa-spin" />}
    </Container>

  );
}
const mapDispath = dispatch => {
  return {
    signout: () => dispatch(AuthActions.resetAuth())
  }
}
export default connect(null, mapDispath)(List);
