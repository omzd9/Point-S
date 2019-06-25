package com.points.connect.payload;

import com.points.connect.model.*;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private RoleName role;

    public UserSummary(Long id, String username, String name, RoleName role) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.role = role;
    }

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public RoleName getRole() {
        return role;
    }

    public void setRole(RoleName role) {
        this.role = role;
    }
}