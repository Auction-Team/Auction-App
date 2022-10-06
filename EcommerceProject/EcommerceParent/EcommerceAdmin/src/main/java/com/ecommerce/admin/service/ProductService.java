package com.ecommerce.admin.service;

import java.util.List;
import java.util.Optional;

import com.ecommerce.common.entity.Product;

public interface ProductService {
	Product save(Product product);

	void deleteById(Long id);

	Optional<Product> findById(Long id);

	List<Product> findAll();
}
