package com.springbootnote.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Note {

    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    //@GeneratedValue(strategy = GenerationType.AUTO, generator = "manual-generator")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "manual-generator")
    @GenericGenerator(name = "manual-generator", strategy = "com.springbootnote.model.generator.ManualInsertGenerator")
    private Long id;
    private String noteName;
    private String userName;
    private String description;

    public Note(Long id, String noteName, String userName, String description) {
        this.id = id;
        this.noteName = noteName;
        this.userName = userName;
        this.description = description;
    }

    public Note() {
    }

    public Long getId() {
        return id;
    }

    public String getNoteName() {
        return noteName;
    }

    public String getUserName() {
        return userName;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNoteName(String noteName) {
        this.noteName = noteName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
