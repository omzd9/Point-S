package com.points.connect.model;

import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.*;

import lombok.*;

@Data

@Entity
@Table(name = "tickets")

public class Ticket {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank
    @Size(max = 50)
    private String object;
	
	@NotBlank
    @Size(max = 250)
    private String body;
	
	/*TODO 
	 *@NotBlank
     *@Column(updatable = false)
	 *private long createdBy;
	 */
	
	@CreationTimestamp
    private Date createdAt;
	
	/*TODO 
	 *@ManyToMany(fetch = FetchType.LAZY)
     *@JoinTable(name = "user_roles",
     *      joinColumns = @JoinColumn(name = "user_id"),
     *      inverseJoinColumns = @JoinColumn(name = "role_id"))
     *private List<User> viewedBy = new ArrayList<>();
	 *
	 *@OneToMany(cascade = CascadeType.ALL,
     *       fetch = FetchType.LAZY,
     *      mappedBy = "ticket")
     *private Set<Reply> replies = new HashSet<>();
     */
}
