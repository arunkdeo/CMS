package com.learners.cms.modles;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Document(collection = "Contacts")
public class Contact {
    @Id
    private String id;
    @NonNull
    private String userNameRef;
    private String firstName;
    private String lastName;
    private String middleName;
    private String title;
    private String gender;
    private String isMarried;
    @JsonFormat(pattern="dd-MM-yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "dd-mm-yyyy")
    private Date weddingDate;
    @JsonFormat(pattern="dd-MM-yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "dd-mm-yyyy")
    private Date birthDate;
    private String occupation;
    private String socializability;
}
