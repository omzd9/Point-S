package com.points.connect.controller;

import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.points.connect.model.Order;
import com.points.connect.model.OrderProduct;
import com.points.connect.model.Product;
import com.points.connect.service.OrderService;
import com.points.connect.service.ProductService;

import javax.validation.Valid;
import java.util.*;


@RestController
@RequestMapping("/api/orders")
//@Slf4j
@RequiredArgsConstructor
public class OrderController {
	  private final OrderService orderService;
	  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<Order>> findAll() {
      return ResponseEntity.ok(orderService.findAll());
  }
  
  @PostMapping()
  public ResponseEntity<Order> create( @Valid @RequestBody Order order){
	  List<OrderProduct> orderProducts = order.getOrderProducts();
	  if(orderProducts!=null)
		  for(OrderProduct orderProduct : orderProducts) {
			  orderProduct.setOrder(order);
			  String product_ref = orderProduct.getProduct().getRef();
			  Product product = productService.findByRef(product_ref);
			  orderProduct.setProduct(product);
		  }
	return ResponseEntity.ok(orderService.save(order));
		  
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<Order> findById(@PathVariable Long id) {	
      Optional<Order> stock = orderService.findById(id);
      if (!stock.isPresent()) {
          ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok(stock.get());
  }

}