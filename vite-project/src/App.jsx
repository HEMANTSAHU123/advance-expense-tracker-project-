import React from 'react';
import Signup from './signupPage/Signup';
import { Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <div>
      <Row className="align-items-start">
        <Col xs="auto">
          home
        </Col>
        <Col xs="auto">
         product
        </Col>
        <Col xs="auto">
         About us
        </Col>
       
      </Row>
      <Signup />
    </div>
  );
};

export default App;