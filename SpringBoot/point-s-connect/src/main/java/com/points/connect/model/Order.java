package com.points.connect.model;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Data

@Entity
@Table(name = "orders")
@NoArgsConstructor
public class Order {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@CreationTimestamp
    private Date createdAt;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	@NotNull
	@JsonIgnoreProperties("order")
	private List<OrderProduct> orderProducts;
}
