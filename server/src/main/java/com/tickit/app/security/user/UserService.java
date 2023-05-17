package com.tickit.app.security.user;

import com.tickit.app.repository.UserRepository;
import jakarta.ws.rs.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service to manage {@link User} entity
 */
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @NonNull
    public User getUserById(long id) {
        final var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throwUserNotFoundException(id);
        }
        return user;
    }

    /**
     * Updates the given user by merging editable properties into persisted user.
     *
     * @param user to be updated
     * @return saved user
     * @throws NotFoundException if no user with the given id was found
     */
    @NonNull
    public User updateUser(final User user) {
        if (!userRepository.existsById(user.getId())) {
            throwUserNotFoundException(user.getId());
        }
        final User dbUser = getUserById(user.getId());
        // ensure only username, name, surname and email address can be edited
        dbUser.setName(user.getName());
        dbUser.setSurname(user.getSurname());
        dbUser.setName(user.getName());
        dbUser.setUsername(user.getUsername());
        return userRepository.save(dbUser);
    }

    /**
     * Creates a new user and encodes the provided password.
     *
     * @param user to be created
     * @return saved user
     */
    @NonNull
    public User createUser(User user) {
        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    @NonNull
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmailOrUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

    /**
     * Changes the user's password if the correct old password was provided.
     *
     * @param passwordChangeRequest request containing old and new password
     * @param userId                user whose password shall be changed
     * @return {@link PasswordChangeResponse} indicating whether the change was successful
     */
    @NonNull
    public PasswordChangeResponse changeUserPassword(@NonNull final PasswordChangeRequest passwordChangeRequest, final Long userId) {
        final String newPassword = passwordChangeRequest.getNewPassword();
        final String oldPassword = passwordChangeRequest.getOldPassword();
        if (newPassword == null || oldPassword == null) {
            return new PasswordChangeResponse(false, "Old and new password must not be null");
        }
        // compare old password with persisted user password
        final User user = getUserById(userId);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(oldPassword, user.getPassword())) {
            return new PasswordChangeResponse(false, "The entered password is invalid");
        }
        user.setPassword(encodePassword(newPassword));
        userRepository.save(user);
        return new PasswordChangeResponse(true, null);
    }

    /**
     * Encodes the given password using the {@link BCryptPasswordEncoder}.
     *
     * @return encoded password
     */
    private String encodePassword(@NonNull final String password) {
        var passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    private void throwUserNotFoundException(final Long id) {
        throw new NotFoundException("User with id " + id + " does not exist");
    }
}
