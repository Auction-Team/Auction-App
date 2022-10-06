package com.ecommerce.admin.config;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.admin.repository.AccountRepository;
import com.ecommerce.admin.repository.RoleRepository;
import com.ecommerce.admin.security.AccountDetail;
import com.ecommerce.common.entity.Account;
import com.ecommerce.common.entity.Role;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

	private boolean alreadySetup = false;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	@Transactional
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		if (alreadySetup) {
			return;
		}

		// Create user roles
		final Role userRole = createRoleIfNotFound(Role.ROLE_USER);
		final Role adminRole = createRoleIfNotFound(Role.ROLE_ADMIN);

		// Create users
		createAccountIfNotFound("user", userRole);
		createAccountIfNotFound("admin", adminRole);

		alreadySetup = true;
	}

	@Transactional
	private final Role createRoleIfNotFound(final String name) {
		Role role = roleRepository.findByName(name);
		if (role == null) {
			role = new Role();
			role.setName(name);
			role = roleRepository.save(role);
		}
		return role;
	}

	@Transactional
	private final Account createAccountIfNotFound(final String email, final Role role) {
		Account account = accountRepository.findByEmail(email).orElse(null);
		if (account == null) {
			account = new Account(email, "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6");
			final java.util.Set<Role> roleSet = new HashSet<>();
			roleSet.add(role);
			account.setRoles(roleSet);
			account = accountRepository.save(account);
		}
		return account;
	}
}