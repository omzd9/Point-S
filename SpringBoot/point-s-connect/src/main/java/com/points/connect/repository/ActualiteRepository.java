package com.points.connect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.points.connect.model.Actualite;

@Repository
public interface ActualiteRepository extends CrudRepository<Actualite,Long> {
	//@Modifying
	@Query(value="select id from actualite where file_name=?1",nativeQuery = true)
	List<Long> findByFileName(String fileName);
	


}

