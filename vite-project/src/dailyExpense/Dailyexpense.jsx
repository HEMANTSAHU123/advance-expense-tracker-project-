import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { realtimedatabase } from '../firebase/firebase';
import { ref,push } from 'firebase/database';
const Dailyexpense = () => {
    const [list, setList] = useState({
        totalmoney: '',
        description: '',
        category: 'food', 
    });
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setList((prevdata) => ({ ...prevdata, [name]: value }));
    };

    const handleFormChange = async(event) => {
        event.preventDefault();
        setLoading(true);
        setError(null)
        console.log("Form Data:", list);
      
       try{
const expenseref=ref(realtimedatabase,'expenses');
 await push(expenseref,list);
       }catch(error){
        console.error('error saving data:',error);
        setError(error.message|| 'error occured while saving data')

       }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="6">
                    <Form onSubmit={handleFormChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Money</Form.Label>
                            <Form.Control
                                type="text"
                                name="totalmoney"
                                value={list.totalmoney}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={list.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Choose a Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={list.category}
                                onChange={handleChange}
                            >
                                <option value="food">Food</option>
                                <option value="petrol">Petrol</option>
                                <option value="salary">Salary</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Dailyexpense;