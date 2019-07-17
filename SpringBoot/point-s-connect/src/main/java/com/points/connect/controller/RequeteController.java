package com.points.connect.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.points.connect.exception.ResourceNotFoundException;
import com.points.connect.model.Reply;
import com.points.connect.model.Requete;
import com.points.connect.model.User;
import com.points.connect.security.CurrentUser;
import com.points.connect.security.UserPrincipal;
import com.points.connect.repository.*;
import com.points.connect.service.RequeteService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/requetes")
//@Slf4j
@RequiredArgsConstructor
public class RequeteController {
    private final ReplyRepository replyRepository;
    private final RequeteService requeteService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Requete>> findAll() {
        return ResponseEntity.ok(requeteService.findAll());
    }

    @PostMapping
    public ResponseEntity<Requete> create(@CurrentUser UserPrincipal currentUser, @Valid @RequestBody Requete requete) {
    	User author = userRepository.findById(currentUser.getId())
    			.orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
    	requete.setAuthor(author);
        return ResponseEntity.ok(requeteService.save(requete));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Requete> findById(@PathVariable Long id) {
        Optional<Requete> stock = requeteService.findById(id);
        if (!stock.isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(stock.get());
    }
    
    @PostMapping("/{id}")
    public Reply create(@PathVariable (value = "id") Long requeteId, @CurrentUser UserPrincipal currentUser,
                                 @Valid @RequestBody Reply reply) {
        return requeteService.findById(requeteId).map(requete -> {
            reply.setRequete(requete);
            User author = userRepository.findById(currentUser.getId())
        			.orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
            reply.setAuthor(author);
            return replyRepository.save(reply);
        }).orElseThrow(() -> new ResourceNotFoundException("Requete","RequeteId",reply));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!requeteService.findById(id).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        requeteService.deleteById(id);

        return ResponseEntity.ok().build();
    }
    
    /*@PutMapping("/{id}")
    public ResponseEntity<Requete> update(@PathVariable Long id, @Valid @RequestBody Requete requete) {
        if (!requeteService.findById(id).isPresent()) {
            //Log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(requeteService.save(requete));
    }*/
}