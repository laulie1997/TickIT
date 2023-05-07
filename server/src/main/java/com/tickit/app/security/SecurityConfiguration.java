package com.tickit.app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user1 = User.withUsername("user1")
                                    .password(passwordEncoder().encode("user1Pass"))
                                    .roles("USER")
                                    .build();
        UserDetails user2 = User.withUsername("user2")
                                    .password(passwordEncoder().encode("user2Pass"))
                                    .roles("USER")
                                    .build();
        UserDetails admin = User.withUsername("admin")
                                    .password(passwordEncoder().encode("adminPass"))
                                    .roles("ADMIN")
                                    .build();
        return new InMemoryUserDetailsManager(user1, user2, admin);
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/register", "/login")
//                .permitAll()
//                .anyRequest()
//                .authenticated()
//                .and()
//                .httpBasic();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/register", "/login").permitAll()
//                .anyRequest().authenticated()
//                .and()
                .httpBasic();
//        .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
//                .and()
//                .formLogin(form -> form
//                                           .loginPage("/login")
//                                           .permitAll()
//                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
