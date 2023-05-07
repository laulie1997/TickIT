package com.tickit.app.security.authentication;

import com.tickit.app.security.user.User;
import com.tickit.app.security.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @NonNull
    private final AuthenticationManager authenticationManager;
    @NonNull
    private final UserService userService;

    @Autowired
    public AuthenticationService(
            @NonNull AuthenticationManager authenticationManager,
            @NonNull UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @NonNull
    public Authentication authenticateUser(LoginCredentials loginCredentials) throws Exception {
        if (loginCredentials.getUsername() == null || loginCredentials.getPassword() == null) {
            throw new Exception("username and password must not be null");
        }

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginCredentials.getUsername(), loginCredentials.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid credentials");
        }
        return authentication;
    }

    @NonNull
    public User registerUser(User user) {
        return userService.saveUser(user);
    }
}
