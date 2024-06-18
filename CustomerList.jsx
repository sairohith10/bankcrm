// src/components/CustomerList.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/customers/findall');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            {customers.length > 0 ? (
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id}>
                            <p><strong>Name:</strong> {customer.name}</p>
                            <p><strong>Email:</strong> {customer.email}</p>
                            <p><strong>Phone:</strong> {customer.phone}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers available</p>
            )}
        </div>
    );
};

export default CustomerList;
