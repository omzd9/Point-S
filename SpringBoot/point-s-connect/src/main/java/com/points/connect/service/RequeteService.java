package com.points.connect.service;

import com.points.connect.model.Requete;
import com.points.connect.repository.RequeteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

@RequiredArgsConstructor
public class RequeteService {
    private final RequeteRepository requeteRepository;

    public List<Requete> findAll() {
        return requeteRepository.findAll();
    }

    public Optional<Requete> findById(Long id) {
        return requeteRepository.findById(id);
    }

    public Requete save(Requete requete) {
        return requeteRepository.save(requete);
    }

    public void deleteById(Long id) {
        requeteRepository.deleteById(id);
    }
}