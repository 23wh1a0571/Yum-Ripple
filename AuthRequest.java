
package com.yumripple.backend.dto;

public class AuthRequest {
    private String email;
    private String password;

    /* getters & setters */
    public String getEmail() { return email; }
    public void setEmail(String e){ this.email = e; }

    public String getPassword(){ return password; }
    public void setPassword(String p){ this.password = p; }
}