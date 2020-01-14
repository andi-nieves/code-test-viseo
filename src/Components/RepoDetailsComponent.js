import React from 'react';
import '../App.css';
import { Container, Col, Row, ListGroup, Button } from 'react-bootstrap';

function RepoDetailsComponent({ data }) {
    return (
        <Container className="margin-top-10">
            <Button variant="link" onClick={() => window.location = data.html_url}><h1>{data.full_name}</h1></Button>
            <p>{data.description} <br /> 
                Created at: {data.created_at} <br />
                Language: {data.language}
                </p>
            <Row>
                <Col>
                    <ListGroup horizontal>
                        <ListGroup.Item><i className="fa fa-eye" /> Watch {data.watchers_count}</ListGroup.Item>
                        <ListGroup.Item><i className="fa fa-star" /> Star {data.stargazers_count}</ListGroup.Item>
                        <ListGroup.Item><i className="fa fa-code-branch" /> Fork {data.forks_count}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row className="margin-top-10">
                <Col>
                    <p>
                        Owner: <br />
                        <Button variant="link" onClick={() => window.location = data.owner.html_url}>
                            <img alt="avatar" src={data.owner.avatar_url} className="avatar" />
                            {data.owner.login}</Button>
                    </p>
                </Col>
            </Row>

        </Container>
    );
}

export default RepoDetailsComponent;
