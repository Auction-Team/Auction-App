package com.ecommerce.admin.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.admin.repository.ProductRepository;
import com.ecommerce.admin.service.ProductService;
import com.ecommerce.common.entity.Product;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Product save(Product product) {
		return productRepository.save(product);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public void deleteById(Long id) {
		productRepository.deleteById(id);
	}

	@Override
	public Optional<Product> findById(Long id) {
		return productRepository.findById(id);
	}

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

}
