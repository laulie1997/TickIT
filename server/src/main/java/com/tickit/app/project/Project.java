package com.tickit.app.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tickit.app.category.Category;
import com.tickit.app.security.user.User;
import com.tickit.app.status.Status;
import com.tickit.app.ticket.Ticket;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Project {

    public static final String OWNER_PROPERTY = "owner";
    public static final String MEMBERS_PROPERTY = "members";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    private String description;

    @JsonIgnore
    @ManyToOne(targetEntity = User.class)
    private User owner;

    @JsonIgnore
    @ManyToMany(targetEntity = User.class)
    private Set<User> members;

    @JsonIgnore
    @OneToMany(targetEntity = Status.class, mappedBy = Status.PROJECT_PROPERTY)
    private Set<Status> statuses;

    @JsonIgnore
    @OneToMany(targetEntity = Ticket.class, mappedBy = Ticket.PROPERTY_PROJECT)
    private Set<Ticket> tickets;

    @JsonIgnore
    @OneToMany(targetEntity = Category.class, mappedBy = Category.PROPERTY_PROJECT)
    private Set<Category> categories;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @UpdateTimestamp
    private LocalDateTime modificationDate;
}
