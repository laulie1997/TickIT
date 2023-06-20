package com.tickit.app.project;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProjectUserAssignment {
    private List<Long> userIds;
}
