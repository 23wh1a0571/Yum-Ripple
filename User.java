
package com.yumripple.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)          // email must be unique
    private String email;

    private String password;

    /* ---------- constructors ---------- */
    public User() { }               // required by JPA

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    /* ---------- getters & setters ---------- */
    public Long getId()            { return id; }
    public void setId(Long id)     { this.id = id; }

    public String getName()        { return name; }
    public void setName(String n)  { this.name = n; }

    public String getEmail()       { return email; }
    public void setEmail(String e) { this.email = e; }

    public String getPassword()    { return password; }
    public void setPassword(String p) { this.password = p; }
}
