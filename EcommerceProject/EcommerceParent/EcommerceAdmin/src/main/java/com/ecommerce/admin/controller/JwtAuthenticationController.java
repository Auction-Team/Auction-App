package com.ecommerce.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.admin.security.AccountDetail;
import com.ecommerce.admin.util.JwtTokenUtil;
import com.ecommerce.common.dto.JwtRequest;
import com.ecommerce.common.dto.JwtResponse;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class JwtAuthenticationController {
	private final AuthenticationManager authenticationManager;
	private final JwtTokenUtil jwtTokenUtil;

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
						authenticationRequest.getPassword()));

		final AccountDetail accountDetails = (AccountDetail) authentication.getPrincipal();
		final String token = jwtTokenUtil.generateToken(accountDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}
}
