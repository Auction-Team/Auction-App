package com.ecommerce.common.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "auc_role")
@Getter
@Setter
@NoArgsConstructor
public class Role extends IdBasedEntity {
	public static final String USER = "USER";
	public static final String ADMIN = "ADMIN";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String ROLE_ADMIN = "ROLE_ADMIN";

	private String name;

	@ManyToMany(mappedBy = "roles")
	private Set<Account> accounts;
}
