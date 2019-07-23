package com.points.connect.service;

import com.points.connect.model.*;
import com.points.connect.repository.CommandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

@RequiredArgsConstructor
public class OrderService {
    private final CommandRepository commandRepository;

    public List<Order> findAll() {
        return commandRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return commandRepository.findById(id);
    }
    
    public Optional<Order> findByIdAndAuthor(Long id, User author) {
        return commandRepository.findByIdAndAuthor(id, author);
    }

    public Order save(Order command) {
        return commandRepository.save(command);
    }

    public void deleteById(Long id) {
        commandRepository.deleteById(id);
    }
}