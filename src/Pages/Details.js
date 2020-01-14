import React from 'react';
import '../App.css';
import RepoDetailsComponent from '../Components/RepoDetailsComponent';
import { Alert } from 'react-bootstrap';
import { get } from 'lodash';


function Details({ location }) {
  const { state } = location;
  const alert = () => <Alert variant={'danger'}>
      <i className='fa fa-times' /> Repo not found!
  </Alert>
  return get(state, 'id', null) ? <RepoDetailsComponent data={state} /> : alert();
}

export default Details;
