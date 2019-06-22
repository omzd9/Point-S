package com.points.connect.controller;

import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.points.connect.model.Product;
import com.points.connect.service.ProductService;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/products")
//@Slf4j
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<Product>> findAll() {
      return ResponseEntity.ok(productService.findAll());
  }

  @PostMapping
  public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
      return ResponseEntity.ok(productService.save(product));
  }
  
  /*
  @GetMapping("/{id}")
  public ResponseEntity<Product> findById(@PathVariable Long id) {
      Optional<Product> stock = productService.findById(id);
      if (!stock.isPresent()) {
          ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok(stock.get());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody Product product) {
      if (!productService.findByRef(id).isPresent()) {
          ResponseEntity.badRequest().build();
      }
      return ResponseEntity.ok(productService.save(product));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
      if (!productService.findById(id).isPresent()) {
          ResponseEntity.badRequest().build();
      }
      productService.deleteById(id);
      
      return ResponseEntity.ok().build();
  }
  */
}