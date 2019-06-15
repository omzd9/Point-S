package com.points.connect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.points.connect.model.venteFlash;

@Repository
public interface venteFlashRepository extends CrudRepository<venteFlash,Long>{

		//public List<String> Files();
}
