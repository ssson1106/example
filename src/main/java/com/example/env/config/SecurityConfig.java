package com.example.env.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.inMemoryAuthentication().withUser("user").password(passwordEncoder.encode("password")).roles("USER").and()
				.withUser("admin").password(passwordEncoder.encode("admin")).roles("USER", "ADMIN");

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
/*
		http
			.csrf().disable()
			.authorizeRequests()
			.antMatchers("/login").permitAll()
			.antMatchers("/user/**").hasAnyRole("USER")
			.antMatchers("/admin/**").hasAnyRole("ADMIN")
			.antMatchers("/**").permitAll()
				.anyRequest().authenticated()
				.and()
				.formLogin().loginPage("/login").loginProcessingUrl("/login")
				.and()
				.httpBasic()
				
				;*/
		http	.csrf().disable()
		.authorizeRequests()
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.anyRequest().authenticated()
		.and()
		.httpBasic();

	}
	/*
	@Service
	public class CustomUserDetailsService implements UserDetailsService {

		@Inject
		UserDao dao;

		@Override
		public user loadUserByUsername(String username) throws UsernameNotFoundException {
			user userInfo = null;
			try {
				userInfo = dao.read(username); //디비 정보를 불러와 유저정보 조
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	  }
	}
	
	@Component
	public class CustomAuthenticationProvider implements AuthenticationProvider { //authenticationManager
	  @Override
	  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
	    UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication; //유저가 입력한 정보를 이이디비번으으로만든다.(로그인한 유저아이디비번정보를담는다)

	    user userInfo = customeUserDetailsService.loadUserByUsername(authToken.getName()); //UserDetailsService에서 유저정보를 불러온다.
	    if (userInfo == null) {
	      throw new UsernameNotFoundException(authToken.getName());
	    }

	    if (!matchPassword(userInfo.getPassword(), authToken.getCredentials())) {
	      throw new BadCredentialsException("not matching username or password");
	    }

	    List<GrantedAuthority> authorities = (List<GrantedAuthority>) userInfo.getAuthorities();

	    return new UsernamePasswordAuthenticationToken(userInfo,null,authorities);
	  }

	  private boolean matchPassword(String password, Object credentials) {
	    return password.equals(credentials);
	  }

	  @Override
	  public boolean supports(Class<?> authentication) {
	    return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	  }

	}
	*/
}
