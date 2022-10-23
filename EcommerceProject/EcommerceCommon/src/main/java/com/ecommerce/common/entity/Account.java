package com.ecommerce.common.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "auc_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account extends IdBasedEntity {

	private String name;
	
	private String address;
	
	private String brief;
	
	private String image_path;
	
	private String email;

	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "account_role", joinColumns = { @JoinColumn(name = "ACCOUNT_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "ROLE_ID") })
	private Set<Role> roles;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="owner")
	private Set<Product> listProducts;

	public Account(String email, String password) {
		this.email = email;
		this.password = password;
	}

}
