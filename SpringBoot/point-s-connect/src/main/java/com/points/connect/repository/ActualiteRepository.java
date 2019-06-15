package com.points.connect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.points.connect.model.Actualite;

@Repository
public interface ActualiteRepository extends CrudRepository<Actualite,Long> {
	

}
