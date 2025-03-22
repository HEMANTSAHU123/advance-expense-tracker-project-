import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Row, Col, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

import { Github,Globe } from 'react-bootstrap-icons';
const Incompleteprofile = () => {
  const [data, setData] = useState({
    fullname: '',
    url: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleformsubmit = (event) => {
    event.preventDefault();
    console.log(data); // Log the form data for debugging
  };

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col xs={12} md={6} className="text-left">
              <p style={{ color: 'black' ,fontStyle:"italic" }}>Winners never quit, Quitters never win</p>
            </Col>
            <Col xs={12} md={6} className="text-right">
            <p style={{ color: 'black', backgroundColor: '#D2B48C', borderRadius: '7px', fontStyle:"italic" }}>
                Your profile is 64% completed, a complete profile has higher chances of landing in a job.
                <Link to="/profile/complete">Complete now</Link>
              </p>
            </Col>
            
          </Row>
        </Container>
       
      </Navbar>
      <hr style={{ margin: '0' }} />
      <Col xs={12} className="d-flex justify-content-end">
      <Button variant="primary" type="submit" style={{color:"red", backgroundColor:"white"}}>
        Cancel
      </Button>
    </Col>
      <Container className="mt-4">
        <h2>Contact Details</h2>
        <Form onSubmit={handleformsubmit}>
          <FormGroup>
            <FormLabel><Github className="me-2"/> profile Name</FormLabel>
            <FormControl type="text" name="fullname" value={data.fullname} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <FormLabel> <Globe className="me-2"/>Profile Photo URL </FormLabel>
            <FormControl type="text" name="url" value={data.url} onChange={handleChange} />
          </FormGroup>
          <Button variant="primary" type="submit">
            Update
          </Button>
          
          
        </Form>
      </Container>
      <hr style={{ margin: '0' }}/>
    </>
  );
};

export default Incompleteprofile;