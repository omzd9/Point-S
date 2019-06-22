package com.points.connect.model;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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
	
	 @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	 @NotNull
	 @JsonIgnoreProperties("order")
	 private List<OrderProduct> orderProducts;

	/*TODO
	 * @ManyToOne
	 * private Client client;
	 */	 
}
