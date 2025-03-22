import {
    signInWithEmailAndPassword,
  
  } from 'firebase/auth';
  import React, { useState } from 'react';
  import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
  import { auth } from '../firebase/firebase';
  import { Envelope, Lock } from 'react-bootstrap-icons';
  import { toast } from 'react-toastify';
  import { useNavigate } from 'react-router-dom';
  const Login = () => {
    const [list, setList] = useState({
      email: '',
      password: '',
    });
    const navigate=useNavigate();
  
    const handleForm = (event) => {
      const { name, value } = event.target;
      setList({ ...list, [name]: value });
    };
  
    const handlesubmit = async (event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, list.email, list.password);
        console.log('user logged successfully');
       navigate('/profile')
        toast.success('user logged successfully');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }

  
   
    };
  
    return (
      <Container>
         <Row className="justify-content-md-center mt-5">
        <Col md="6" className="shadow p-4 rounded bg-light">
          <Form onSubmit={handlesubmit}>
            <h3 className="text-center mb-4">Login Form</h3>
            
            {/* Email Input */}
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>
                <Envelope className="me-2" />
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={list.email}
                onChange={handleForm}
                className="py-2"
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>
                <Lock className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={list.password}
                onChange={handleForm}
                className="py-2"
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg" className="mb-3">
                Submit
              </Button>
            </div>

            {/* Forgot Password Link */}
            <p className="text-center mt-3">
              <a href="#" className="text-decoration-none">
                Forgot password?
              </a>
            </p>
            </Form>
            <p className="mt-3 text-center">
                Don't have an account ? <a href="/signup">sign up</a>
              </p>
          </Col>
        </Row>
  
       
      </Container>
    );
  };
  
  export default Login;