package com.springbootnote.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "manual-generator")
//    @GenericGenerator(name = "manual-generator", type = com.springbootnote.model.generator.ManualInsertGenerator.class, strategy = "com.springbootnote.model.generator.ManualInsertGenerator")
    @GenericGenerator(name = "manual-generator", type = com.springbootnote.model.generator.ManualInsertGenerator.class)
    private Long id;
    private String noteName;
    private String userName;

    // fix 255 length limit, description should be long enough
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    public Note(Long id, String noteName, String userName, String description) {
        this.id = id;
        this.noteName = noteName;
        this.userName = userName;
        this.description = description;
    }

    public Note() {
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((noteName == null) ? 0 : noteName.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((userName == null) ? 0 : userName.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || (this.getClass() != obj.getClass())) {
            return false;
        }

        if (this == obj) {
            return true;
        }

        Note other = (Note) obj;
//        if (id == null) {
//            if (other.id != null)
//                return false;
//        } else if (!id.equals(other.id)) {
//            return false;
//        }

        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description)) {
            return false;
        }

        if (noteName == null) {
            if (other.noteName != null)
                return false;
        } else if (!noteName.equals(other.noteName)) {
            return false;
        }

        if (userName == null) {
            if (other.userName != null)
                return false;
        } else if (!userName.equals(other.userName)) {
            return false;
        }

        return true;
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
