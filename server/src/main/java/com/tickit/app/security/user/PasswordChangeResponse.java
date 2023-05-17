package com.tickit.app.security.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

/**
 * Response for {@link PasswordChangeRequest}
 */
@Getter
@Setter
public class PasswordChangeResponse {
    private boolean successful;

    private String message;

    public PasswordChangeResponse(boolean successful, @Nullable String message) {
        this.successful = successful;
        this.message = message;
    }
}
