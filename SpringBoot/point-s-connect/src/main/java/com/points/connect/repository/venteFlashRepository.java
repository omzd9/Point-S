package com.points.connect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.points.connect.model.venteFlash;

@Repository
public interface venteFlashRepository extends CrudRepository<venteFlash,Long>{

	@Query(value="select id from vente_flash where file_name=?1",nativeQuery = true)
	List<Long> findByFileName(String fileName);
}
