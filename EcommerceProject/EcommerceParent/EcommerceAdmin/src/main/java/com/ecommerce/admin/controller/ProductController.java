package com.ecommerce.admin.controller;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
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
import com.ecommerce.common.entity.Role;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@Secured(Role.ROLE_USER)
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
	@Override
	public String updateProduct(@PathVariable(value = "productId") Long productId, @RequestBody Product product) {
		// TODO: check --> Không thể cập nhật thông tin sản phẩm trước 5 phút đấu giá

		// TODO: upload image

		return productService.findById(productId).map(p -> {
			p.setName(product.getName());
			p.setInitPrice(product.getInitPrice());
			p.setDescription(product.getDescription());
			// p.setImagePaths()
			p.setStepPrice(p.getStepPrice());
			p.setStartAuc(product.getStartAuc());
			p.setEndAuc(product.getEndAuc());
			productService.save(p);
			return "Product updated";
		}).orElseThrow(() -> new ResourceNotFoundException("productId " + productId + " not found"));
	}

	@DeleteMapping("/{productId}")
	@Override
	public String deleteProduct(@PathVariable(value = "productId") Long productId) {
		// TODO: check --> Không thể cập nhật thông tin sản phẩm trước 5 phút đấu giá
		return productService.findById(productId).map(p -> {
			productService.deleteById(productId);
			return "Product deleted";
		}).orElseThrow(() -> new ResourceNotFoundException("productId " + productId + " not found"));
	}

}
