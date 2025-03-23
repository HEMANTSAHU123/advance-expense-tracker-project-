import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('email reset succesfully');
            toast.success('Password reset email sent. Check your inbox.');
            navigate('/forgot'); 
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="6" className="shadow p-4 rounded bg-light">
                    <Form onSubmit={handleResetPassword}>
                        <h3 className="text-center mb-4">Forgot Password</h3>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>
                               
                                Enter the mail with which u have ragistered 
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-2"
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Send Link'}
                            </Button>
                            <p style={{
                                paddingLeft:"80px"
                            }}>already a user ? <Link to='/login'>login</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;