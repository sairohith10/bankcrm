import React, { useState, useEffect } from 'react';
import api from '../api';
import './CustomerList.css'; // Import CSS for styling

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/customers/findall'); // Adjust endpoint as per your backend API
            setCustomers(response.data);
            setFilteredCustomers(response.data); // Initialize filtered customers with all customers
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const sortCustomers = (key) => {
        if (key === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        filterCustomers(event.target.value);
    };

    const filterCustomers = (query) => {
        if (!query) {
            setFilteredCustomers(customers);
            return;
        }

        const normalizedQuery = query.toLowerCase();
        const filtered = customers.filter((customer) => (
            customer.name.toLowerCase().includes(normalizedQuery) ||
            customer.email.toLowerCase().includes(normalizedQuery) ||
            customer.phone.toLowerCase().includes(normalizedQuery)
        ));
        setFilteredCustomers(filtered);
    };

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        const compareValue = sortOrder === 'asc' ? 1 : -1;
        if (a[sortBy] > b[sortBy]) return compareValue;
        if (a[sortBy] < b[sortBy]) return -compareValue;
        return 0;
    });

    return (
        <div>
            <h2>Customer List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            {customers.length > 0 ? (
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortCustomers('name')} className="sortable">
                                Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => sortCustomers('email')} className="sortable">
                                Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th onClick={() => sortCustomers('phone')} className="sortable">
                                Phone {sortBy === 'phone' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers available</p>
            )}
        </div>
    );
};

export default CustomerList;
