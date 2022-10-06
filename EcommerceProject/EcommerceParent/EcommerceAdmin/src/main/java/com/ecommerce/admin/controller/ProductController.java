package com.ecommerce.admin.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.admin.exception.ResourceNotFoundException;
import com.ecommerce.admin.service.ProductService;
import com.ecommerce.common.entity.Product;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController implements ProductApi {
	private final ProductService productService;

	@GetMapping("/")
	@Override
	public List<Product> getProductList(String consumerKey) {
		return productService.findAll();
	}

	@GetMapping("/{productId}")
	@Override
	public Product getProduct(@PathVariable(value = "productId") Long productId) {
		return productService.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("productId " + productId + " not found"));
	}

	@PostMapping
	@Override
	public String createProduct(@RequestBody Product product) {
		productService.save(product);
		return "Product added";
	}

	@PutMapping("/{productId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@Override
	public String updateProduct(@PathVariable(value = "productId") Long productId, @RequestBody Product product) {
		return productService.findById(productId).map(p -> {
			p.setName(product.getName());
			p.setPrice(product.getPrice());
			productService.save(p);
			return "Product updated";
		}).orElseThrow(() -> new ResourceNotFoundException("productId " + productId + " not found"));
	}

	@DeleteMapping("/{productId}")
	@Override
	public String deleteProduct(@PathVariable(value = "productId") Long productId) {
		return productService.findById(productId).map(p -> {
			productService.deleteById(productId);
			return "Product deleted";
		}).orElseThrow(() -> new ResourceNotFoundException("productId " + productId + " not found"));
	}

}
