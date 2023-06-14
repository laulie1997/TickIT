package com.tickit.app.security.user;

import java.util.List;

public class UserWrapper {
    List<User> users;

    public UserWrapper(List<User> users) {
        this.users = users;
    }
}