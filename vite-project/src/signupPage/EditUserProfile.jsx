import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, Container, Row, Col, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { Github, Globe } from 'react-bootstrap-icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditUserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: '',
    url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          console.error('userId is undefined or invalid');
          setLoading(false);
          return;
        }
        console.log('Fetching user data for userId:', userId);

        const userDocRef = doc(db, 'myprofile', userId); // Correct collection
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data()) {
          setData(userDoc.data());
        } else {
          console.log('User not found or data is empty for userId:', userId);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!userId) {
        console.error('userId is undefined or invalid');
        return;
      }
      const userDocRef = doc(db, 'myprofile', userId); // Correct collection
      await updateDoc(userDocRef, data);
      console.log('User data updated successfully for userId:', userId);
      navigate(`/profile/edit/${userId}`);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar expand="lg">
        {/* Navbar code... */}
      </Navbar>
      <hr style={{ margin: '0' }} />
      <Col xs={12} className="d-flex justify-content-end">
        <Button variant="primary" onClick={() => navigate(`/profile/edit/${userId}`)} style={{ color: 'red', backgroundColor: 'white' }}>
          Cancel
        </Button>
      </Col>
      <Container className="mt-4">
        <h2>Edit User Details</h2>
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <FormLabel>
              <Github className="me-2" /> profile Name
            </FormLabel>
            <FormControl type="text" name="fullname" value={data.fullname} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <Globe className="me-2" />
              Profile Photo URL
            </FormLabel>
            <FormControl type="text" name="url" value={data.url} onChange={handleChange} />
          </FormGroup>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
      <hr style={{ margin: '0' }} />
    </>
  );
};

export default EditUserProfile;