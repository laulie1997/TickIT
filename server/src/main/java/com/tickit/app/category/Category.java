package com.tickit.app.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tickit.app.project.Project;
import com.tickit.app.ticket.Ticket;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Setter
@Getter
public class Category implements Serializable {

    public static final String PROPERTY_PROJECT = "project";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    /**
     * Color as HEX
     */
    private String color;

    @JsonIgnore
    @ManyToMany(targetEntity = Ticket.class, mappedBy = Ticket.PROPERTY_CATEGORIES)
    private Set<Ticket> tickets;

    @JsonIgnore
    @NotNull
    @ManyToOne(targetEntity = Project.class, optional = false)
    @JoinColumn(name = "project_id", referencedColumnName = "id", nullable = false)
    private Project project;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @UpdateTimestamp
    private LocalDateTime modificationDate;
}
