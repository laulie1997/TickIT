package com.tickit.app.security.authentication;

import com.tickit.app.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/security")
public class AuthenticationResource {

    @NonNull
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationResource(@NonNull AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("login")
    public Authentication login(@RequestBody LoginCredentials loginCredentials) throws Exception {
        return authenticationService.authenticateUser(loginCredentials);
    }

    @PostMapping("registration")
    public User registerUser(@RequestBody User user) {
        return authenticationService.registerUser(user);
    }
}
