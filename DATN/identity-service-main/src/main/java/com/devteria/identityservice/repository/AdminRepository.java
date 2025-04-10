package com.devteria.identityservice.repository;

import com.devteria.identityservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUserId(String userId);
}
