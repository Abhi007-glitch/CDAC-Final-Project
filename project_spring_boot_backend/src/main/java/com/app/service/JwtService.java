package com.app.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

	public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
	
	
	private Key getSignKey() {
		byte[] keyBytes=Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	private String createToken(Map<String,Object> claims,String userEmail) {
		System.out.println("in createtoken");
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(userEmail)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*30*60))
				.signWith(getSignKey(),SignatureAlgorithm.HS256).compact();
	}
	
	public String generateToken(String userEmail) {
		Map<String,Object> claims=new HashMap<>();
		return createToken(claims, userEmail);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	public <T> T extractClaim(String token,Function<Claims,T> claimsResolver) {
		final Claims claims=extractAllClaims(token);
		return claimsResolver.apply(claims);
	} 
	
	public String extractEmail(String token) {
		return extractClaim(token,Claims::getSubject);
	}

	
	public Date extractexpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	public Boolean isTokenExpired(String token) {
		return extractexpiration(token).before(new Date());
	}
	
	public Boolean validateToken(String token,UserDetails userDetails) {
		final String useremail=extractEmail(token);
		return (useremail.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
}
