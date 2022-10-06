package com.ecommerce.admin.util;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = -2096899421724427704L;

	private static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;

	@Value("${jwt.secret}")
	private String secretKey;

	// retrieve email from jwt token
	public String getEmailFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	// retrieve expiration date from jwt token
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	// for retrieveing any information from token we will need secret
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	// check if the token has expired
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	// generate token for user
	public String generateToken(UserDetails userDetails) {
		final Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	private String doGenerateToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
				.signWith(SignatureAlgorithm.HS512, secretKey).compact();
	}

	public Boolean validateAccessToken(String accessToken) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken);
			return true;
		} catch (final ExpiredJwtException e) {
			log.error("JWT expired ", e);
		} catch (final IllegalArgumentException e) {
			log.error("Token is null, empty or has only whitespace ", e);
		} catch (final MalformedJwtException e) {
			log.error("JWT is invalid ", e);
		} catch (final UnsupportedJwtException e) {
			log.error("JWT is not supported ", e);
		} catch (final SignatureException e) {
			log.error("Signature validation failed ", e);
		}
		return false;
	}

	// validate token
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String email = getEmailFromToken(token);
		return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
