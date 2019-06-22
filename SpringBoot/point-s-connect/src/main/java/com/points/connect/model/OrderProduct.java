package com.points.connect.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Data
@NoArgsConstructor
@Entity
public class OrderProduct {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
    private Long id;
	
	@ManyToOne
    @JoinColumn
    @JsonIgnoreProperties("orderProducts")
    private Order order;
	
	@ManyToOne
    @JoinColumn
    @JsonIgnoreProperties("orderProducts")
    private Product product;
	
    @Column(name = "quantity")
    private int quantity;

}
