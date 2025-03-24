import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col,ListGroup, } from 'react-bootstrap';
import { realtimedatabase } from '../firebase/firebase';
import { ref,push,onValue,remove,update } from 'firebase/database';
const Dailyexpense = () => {
    const [list, setList] = useState({
        totalmoney: '',
        description: '',
        category: 'food', 
    });
const[loading,setLoading]=useState(false);
const[error,setError]=useState(null);
const[expenses,setExpenses]=useState([])
const[editId,setEditId]=useState(null)
useEffect(()=>{
    const expenseref=ref(realtimedatabase,'expenses');
    const unsubscribe=onValue(expenseref,(snapshot)=>{
        const data=snapshot.val();
        if(data){
            const expensearr=Object.keys(data).map((key)=>({
                id:key,
                ...data[key]
            }))
            setExpenses(expensearr);
        }
        else{
            setExpenses([]);
        }
    })
    return ()=>unsubscribe();
},[])
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
        if(editId){
            const expenseref=ref(realtimedatabase,`expenses/${editId}`);
            await update(expenseref,list);
            setEditId(null)
        }
        else{
const expenseref=ref(realtimedatabase,'expenses');
 await push(expenseref,list);
       }
       setList({totalmoney:'',description:'', category:""})
    }
       catch(error){
        console.error('error saving data:',error);
        setError(error.message|| 'error occured while saving data')
       }
       setLoading(false);
    };
    const deleteExpense=async(id)=>{
        try{
        const expenseref=ref(realtimedatabase,`expenses/${id}`);
        await remove(expenseref);
        setExpenses((prevExpenses)=>prevExpenses.filter((expense)=>expense.id!==id));
    }catch(err){
        console.error('error deleted expenses');
        setError(err.message|| 'an error occured while deleting')

    }
    }
    const handleEdit=(expense)=>{
        setEditId(expense.id);
        setList({
            totalmoney:expense.totalmoney,
            description:expense.description,
            category:expense.category
        })
    }
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

                        <Button variant="primary" type="submit" disabled={loading}>{loading ? 'saving...':'expenses'}
                       
                        </Button>
                      
                    </Form>
                    <ListGroup className="mt-4">
                        {expenses.map((expense) => (
                            <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{expense.category}:</strong> {expense.description} - ${expense.totalmoney}
                                </div>
                                <Button  onClick={()=>handleEdit(expense)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteExpense(expense.id)}>
                                    Delete
                                </Button>
                            </ListGroup.Item>
                        
                        ))}
                    </ListGroup>
                 
                </Col>
            </Row>
        </Container>
    );
};

export default Dailyexpense;