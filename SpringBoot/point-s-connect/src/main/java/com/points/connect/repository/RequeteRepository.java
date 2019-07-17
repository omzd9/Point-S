package com.points.connect.repository;

import com.points.connect.model.Requete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RequeteRepository extends  JpaRepository<Requete, Long>{
}

