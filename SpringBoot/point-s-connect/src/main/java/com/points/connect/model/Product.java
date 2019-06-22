package com.points.connect.model;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Data

@Entity
@Table(name = "products")

public class Product {
	@Id
    private String ref;
	
	@NotBlank
    @Size(max = 50)
    private String name;
	
	@NotNull
    private int price;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("product")
	private List<OrderProduct> orderProducts;
    
}
