package com.tickit.app.project;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Status {

    public static final String PROJECT_PROPERTY = "project";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    private String color;

    private String icon;

    @ManyToOne(targetEntity = Project.class, optional = false)
    @Cascade(CascadeType.DELETE)
    private Project project;

    @OneToMany(targetEntity = Ticket.class, mappedBy = Ticket.PROPERTY_STATUS)
    private Set<Ticket> tickets;
}
