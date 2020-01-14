import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, InputGroup, Alert, FormControl, Button } from 'react-bootstrap';
import { AuthActions } from '../Redux/Module';
import '../App.css';

function List({ history, setAuth }) {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const [username, setUsername] = React.useState('andi@github.com');
  const [password, setPassword] = React.useState('P@ssw0rd');

  const loginHandler = () => {
    if(username !== 'andi@github.com' && password !== 'P@ssw0rd') {
      setShowError(true)
      return;
    }
    setAuth({
      userId: Math.random(),
      username
    })
    history.push('/list')

  }

  const loginError = errorMessage => {
    return showError && (
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <Alert variant={'danger'} onClick={() => setShowError(false)}>
            <i className='fa fa-times' /> Username and Password not match!
          </Alert>
        </Col>
      </Row>
    )
  }
  const viewPasswordHandler = () => setViewPassword(!viewPassword);
  return (
    <Container style={{ marginTop: 150 }}>
      
      {loginError()}
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <FormControl
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center margin-top-10" >
        <Col sm={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              type={viewPassword ? "text" : "password"}
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={viewPasswordHandler}>	<i className={`fas fa-${viewPassword ? 'eye-slash' : 'eye'}`}></i></Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center margin-top-10">
        <Col sm={6}>
          <Button onClick={loginHandler} disabled={username.trim().length === 0 || password.trim().length === 0}>Login</Button>
        </Col>
      </Row>
    </Container>
  );
}
const mapStates = state => state;
const mapDispatch = dispatch => {
  return {
    setAuth: data => dispatch(AuthActions.setState(data))
  }
}
export default connect(mapStates, mapDispatch)(List);
