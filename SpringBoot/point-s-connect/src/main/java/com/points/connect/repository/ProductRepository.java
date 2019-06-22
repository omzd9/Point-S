package com.points.connect.repository;

import com.points.connect.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Product findByRef(String ref);
}
