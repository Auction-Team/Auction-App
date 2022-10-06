package com.ecommerce.admin.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.admin.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

	private static final String AUTHORIZATION = "Authorization";

	private static final String BEARER = "Bearer";

	private final AccountDetailsServiceImpl accountDetailsServiceImpl;

	private final JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader(AUTHORIZATION);

		if (BooleanUtils.isFalse(StringUtils.startsWith(header, BEARER))) {
			filterChain.doFilter(request, response);
			return;
		}

		String accessToken = header.split(" ")[1].trim();

		if (BooleanUtils.isFalse(jwtTokenUtil.validateAccessToken(accessToken))) {
			filterChain.doFilter(request, response);
			return;
		}

		String email = jwtTokenUtil.getEmailFromToken(accessToken);

		// Once we get token validate is user
		UserDetails accountDetails = accountDetailsServiceImpl.loadUserByUsername(email);

		// if token is valid configure security to manually set
		// authentication
		if (BooleanUtils.isTrue(jwtTokenUtil.validateToken(accessToken, accountDetails))) {
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(accountDetails,
					null, accountDetails.getAuthorities());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);

	}

}
