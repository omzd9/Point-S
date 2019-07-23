package com.points.connect.repository;

import com.points.connect.model.Order;
import com.points.connect.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommandRepository extends JpaRepository<Order, Long> {
	Optional<Order> findByIdAndAuthor(Long id, User author);
}
