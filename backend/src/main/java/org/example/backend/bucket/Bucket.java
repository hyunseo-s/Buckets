package org.example.backend.bucket;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Bucket {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Bucket() {}

    public Bucket(String name) {
        this.name = name;
    }
}
