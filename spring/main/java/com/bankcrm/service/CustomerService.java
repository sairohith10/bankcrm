package com.bankcrm.service;

import com.bankcrm.model.Customer;
import com.bankcrm.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class CustomerService {
	
	
	@Autowired
	private CustomerRepository customerRepository;


	public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

	public Customer createCustomer(Customer customer) {
	    return customerRepository.save(customer);
	}

}
