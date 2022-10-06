package com.ecommerce.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.common.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByName(String name);
}
