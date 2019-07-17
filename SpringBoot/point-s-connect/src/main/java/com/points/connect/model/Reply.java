package com.points.connect.model;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.*;

@Data

@Entity
@Table(name = "replies")
public class Reply {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Lob
    private String body;
	
    
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requete_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnoreProperties("replies")
    private Requete requete;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
		
	@CreationTimestamp
    private Date createdAt;
}
