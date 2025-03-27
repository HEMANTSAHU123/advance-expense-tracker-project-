import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
} from '../Store/expenseSlice'
import { toggleTheme } from '../Store/themeSlice';

const Dailyexpense = () => {
    const [list, setList] = useState({
        totalmoney: '',
        description: '',
        category: 'food',
    });
    const [editId, setEditId] = useState(null);

    const dispatch = useDispatch();
    const { expenses, loading, error, showPremiumButton } = useSelector((state) => state.expense);
    const { isDarkMode } = useSelector((state) => state.theme);
    const { isAuthenticated, isLoadingAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && !isLoadingAuth) {
            dispatch(fetchExpenses());
        }
    }, [dispatch, isAuthenticated, isLoadingAuth]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setList((prevdata) => ({ ...prevdata, [name]: value }));
    };

    const handleFormChange = async (event) => {
        event.preventDefault();
        if (!isAuthenticated || isLoadingAuth) {
            console.error("User not authenticated or authentication loading, cannot add expense.");
            return;
        }
        if (editId) {
            dispatch(updateExpense({ id: editId, updatedData: list }));
            setEditId(null);
        } else {
            dispatch(addExpense(list));
        }
        setList({ totalmoney: '', description: '', category: "food" });
    };

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpense(id));
    };

    const handleEdit = (expense) => {
        setEditId(expense.id);
        setList({
            totalmoney: expense.totalmoney,
            description: expense.description,
            category: expense.category
        });
    };

    const handleActivatePremium = () => {
        dispatch(toggleTheme());
        alert('Premium features activated! Dark theme enabled.');
        // You might want to dispatch an action here to mark the user as premium in your backend
    };

    const downloadExpensesCSV = () => {
        if (expenses.length === 0) {
            alert('No expenses to download.');
            return;
        }

        const header = "Category,Description,Total Money\n";
        const csvRows = expenses.map(expense => {
            return `${expense.category},\"${expense.description}\",${expense.totalmoney}`;
        }).join('\n');

        const csvData = header + csvRows;
        const filename = 'expenses.csv';
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                alert('Your browser does not support direct file download.');
            }
        }
    };

    return (
        <Container data-theme={isDarkMode ? 'dark' : 'light'}>
            <Row className="justify-content-md-center mt-5">
                <Col md="6">
                    <h2>Add New Expense</h2>
                    <Form onSubmit={handleFormChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Money</Form.Label>
                            <Form.Control
                                type="number"
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
                                <option value="shopping">Shopping</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="others">Others</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading || isLoadingAuth}>
                            {loading ? 'Saving...' : editId ? 'Update Expense' : 'Add Expense'}
                        </Button>
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </Form>

                    <h2 className="mt-4">Expenses</h2>
                    {loading ? (
                        <p>Loading expenses...</p>
                    ) : expenses.length === 0 ? (
                        <p>No expenses added yet.</p>
                    ) : (
                        <ListGroup className="mt-4">
                            {expenses.map((expense) => (
                                <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{expense.category}:</strong> {expense.description} - ₹{expense.totalmoney}
                                    </div>
                                    <div>
                                        <Button size="sm" onClick={() => handleEdit(expense)} className="me-2">Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    <h3 className="mt-4">Total Expense: ₹{expenses.reduce((sum, expense) => sum + parseFloat(expense.totalmoney || 0), 0).toFixed(2)}</h3>
                    {showPremiumButton && (
                        <Button variant="warning" className="mt-3" onClick={handleActivatePremium}>
                            Activate Premium
                        </Button>
                    )}

                    <div className="mt-3">
                        <Button variant={isDarkMode ? 'light' : 'dark'} onClick={() => dispatch(toggleTheme())}>
                            Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
                        </Button>
                    </div>

                    <div className="mt-3">
                        <Button variant="outline-secondary" onClick={downloadExpensesCSV}>
                            Download Expenses (CSV)
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dailyexpense;