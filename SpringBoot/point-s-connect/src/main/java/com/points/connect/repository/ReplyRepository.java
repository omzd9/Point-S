package com.points.connect.repository;


import com.points.connect.model.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Optional<Reply> findByRequeteId(Long requeteId);
    Optional<Reply> findByIdAndRequeteId(Long id, Long requeteId);
}