package com.springbootnote.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

//User is reserved words in H2 database
@Entity
public class NoteUser {


    //    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "manual-generator")
//    @GenericGenerator(name = "manual-generator", strategy = "com.springbootnote.model.generator.ManualInsertGenerator")
    @Id
    private Long id;
    private String password;
    private String username;


    public NoteUser(Long id, String password, String username) {
        this.id = id;
        this.password = password;
        this.username = username;
    }

    public NoteUser() {
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setPassword(String noteName) {
        this.password = noteName;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || (this.getClass() != obj.getClass())) {
            return false;
        }

        if (this == obj) {
            return true;
        }

        NoteUser other = (NoteUser) obj;
        if (username == null) {
            if (other.username != null)
                return false;
        } else if (!username.equals(other.username)) {
            return false;
        }
        if (password == null) {
            if (other.password != null)
                return false;
        } else if (!password.equals(other.password)) {
            return false;
        }


        return true;
    }


}
