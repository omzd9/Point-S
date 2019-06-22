package com.points.connect.repository;

import com.points.connect.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TicketRepository extends  JpaRepository<Ticket, Long>{
}

