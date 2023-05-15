package com.tickit.app.project;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Column {

    public static final String PROJECT_PROPERTY = "project";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    private String color;

    private String icon;

    @ManyToOne(targetEntity = Project.class, optional = false)
    private Project project;
}
