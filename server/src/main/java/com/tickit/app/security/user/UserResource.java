package com.tickit.app.security.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserResource {

    @NonNull
    private final UserService userService;

    @Autowired
    public UserResource(@NonNull final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("{userId}")
    public User updateUser(@PathVariable String userId, @RequestBody User user) {
        user.setId(Long.parseLong(userId));
        return userService.updateUser(user);
    }

    @PostMapping("{userId}/passwordChange")
    public PasswordChangeResponse changePassword(
            @RequestBody PasswordChangeRequest passwordChangeRequest,
            @PathVariable Long userId) {
        return userService.changeUserPassword(passwordChangeRequest, userId);
    }
}
