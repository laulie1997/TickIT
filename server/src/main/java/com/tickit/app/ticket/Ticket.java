package com.tickit.app.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tickit.app.category.Category;
import com.tickit.app.project.Project;
import com.tickit.app.security.user.User;
import com.tickit.app.status.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
public class Ticket implements Serializable, Comparable<Ticket> {

    public static final String PROPERTY_CREATED_BY = "createdBy";
    public static final String PROPERTY_ASSIGNEE = "assignee";
    public static final String PROPERTY_STATUS = "status";
    public static final String PROPERTY_PROJECT = "project";
    public static final String PROPERTY_CATEGORIES = "categories";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    private String description;

    private long dueDate;

    @ManyToOne(targetEntity = User.class)
    private User createdBy;

    @ManyToOne(targetEntity = User.class)
    private User assignee;

    @JsonIgnore
    @NotNull
    @ManyToOne(targetEntity = Project.class, optional = false)
    @Cascade(CascadeType.DELETE)
    private Project project;

    @NotNull
    @ManyToOne(targetEntity = Status.class, optional = false)
    private Status status;

    @ManyToMany(targetEntity = Category.class)
    @Cascade(CascadeType.DELETE)
    private Set<Category> categories;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @UpdateTimestamp
    private LocalDateTime modificationDate;

    @Override
    public int compareTo(Ticket o) {
        return Long.compare(getId(), o.getId());
    }
}
