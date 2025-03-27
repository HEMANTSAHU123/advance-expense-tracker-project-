import React, {useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { signupUser,resetSignupState } from '../Store/authSlice'
const Signup = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();
const dispatch=useDispatch();
const{error,user,isLoading}=useSelector(state=>state.auth)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(signupUser(data))
  }
 
  useEffect(()=>{
    if (user) {
      console.log('user registered succesfully', user);
      navigate('/login');
      dispatch(resetSignupState());
  }
  if (error) {
      console.log('Signup error', error);
  }
  return () => {
      dispatch(resetSignupState());
  };
}, [user, error, navigate, dispatch]);

  

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
                      value={data.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'sign Up'}
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