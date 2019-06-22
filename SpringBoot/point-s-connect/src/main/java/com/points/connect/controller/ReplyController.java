package com.points.connect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.points.connect.exception.ResourceNotFoundException;
import com.points.connect.model.Reply;
import com.points.connect.repository.ReplyRepository;
import com.points.connect.repository.TicketRepository;

import javax.validation.Valid;


import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/tickets/{ticketId}/replies")
//@Slf4j
@RequiredArgsConstructor
public class ReplyController {
	@Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping
    public Page<Reply> getAllReplysByTicketId(@PathVariable (value = "ticketId") Long ticketId,
                                                Pageable pageable) {
        return replyRepository.findByTicketId(ticketId, pageable);
    }

    @PostMapping
    public Reply createReply(@PathVariable (value = "ticketId") Long ticketId,
                                 @Valid @RequestBody Reply reply) {
        return ticketRepository.findById(ticketId).map(ticket -> {
            reply.setTicket(ticket);
            return replyRepository.save(reply);
        }).orElseThrow(() -> new ResourceNotFoundException("Ticket","TicketId",reply));
    }

    @PutMapping("/{replyId}")
    public Reply updateReply(@PathVariable (value = "ticketId") Long ticketId,
                                 @PathVariable (value = "replyId") Long replyId,
                                 @Valid @RequestBody Reply replyRequest) {
        if(!ticketRepository.existsById(ticketId)) {
            throw new ResourceNotFoundException("Ticket","TicketId",replyRequest);
        }

        return replyRepository.findById(replyId).map(reply -> {
            reply.setBody(replyRequest.getBody());
            return replyRepository.save(reply);
        }).orElseThrow(() -> new ResourceNotFoundException("Reply","replyId",replyRequest));
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable (value = "ticketId") Long ticketId,
                              @PathVariable (value = "replyId") Long replyId) {
        return replyRepository.findByIdAndTicketId(replyId, ticketId).map(reply -> {
            replyRepository.delete(reply);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Reply","ReplyId",null));
    }
}

