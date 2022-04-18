package com.learners.cms.modles;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Document("AppUsers")
@NoArgsConstructor
public class AppUser {

    @Id
    private String userName;

    @NonNull
    @JsonProperty("credential")
    private String credential;
    @NonNull
    private String fullName;
    @JsonFormat(pattern="dd-MM-yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "dd-mm-yyyy")
    @NonNull
    private Date dateOfBirth;
    @NonNull
    private String activeState;
}
