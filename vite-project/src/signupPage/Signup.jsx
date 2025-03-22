import React, { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './Navbar';
const Signup = () => {
  const [list, setList] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setList((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        list.email,
        list.password
      );
      const user = userCredential.user;
      if (user) {
        await setDoc(doc(db, 'User', user.uid), {
          email: user.email,
        });
      }
      console.log('user register successfully');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error('Error handling signup:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>    <MyNavbar/>
    <Container fluid style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
        <Col md={8} lg={6}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
            <Row className="justify-content-center">
              <Col md={8}>
                <h2 className="text-center mb-4">SignUp</h2>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={list.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={list.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </Form>
                <p className="text-center mt-3">

                  have an account? <a href="/login">Login</a>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue',
          borderBottomLeftRadius: '200px',
        }}
      ></div>
    </Container>
    </>

  );
};

export default Signup;