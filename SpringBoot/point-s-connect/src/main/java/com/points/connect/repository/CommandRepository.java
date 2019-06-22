package com.points.connect.repository;

import com.points.connect.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommandRepository extends JpaRepository<Order, Long> {
}
