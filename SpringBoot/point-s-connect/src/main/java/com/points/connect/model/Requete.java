package com.points.connect.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.*;

import lombok.*;

@Data

@Entity
@Table(name = "requetes")

public class Requete {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank
    @Size(max = 50)
    private String object;
	
	@NotBlank
    @Size(max = 250)
    private String body;
	
	@CreationTimestamp
    private Date createdAt;
	
	@NotNull
	private Date delai;
	
    private String[] fileNames;

	
	@OneToMany(cascade = CascadeType.ALL,
           fetch = FetchType.LAZY,
           mappedBy = "requete")
	@JsonIgnoreProperties("requete")
    private List<Reply> replies;
	 

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

	/*TODO 
	 *@ManyToMany(fetch = FetchType.LAZY)
     *@JoinTable(name = "user_roles",
     *      joinColumns = @JoinColumn(name = "user_id"),
     *      inverseJoinColumns = @JoinColumn(name = "role_id"))
     *private List<User> viewedBy = new ArrayList<>();
	 */
     
}
