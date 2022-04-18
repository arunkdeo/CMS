package com.learners.cms.modles;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Addresses")
public class Address {
    @Id
    private String id;
    @NonNull
    private String contactId;
    @NonNull
    private String address1;
    private String address2;
    @NonNull
    private String city;
    @NonNull
    private String state;
    private String zip;
    @NonNull
    private String country;

    private String mobileNo;
    private String alternateMobileNo;
    private String homePhone;
    private String officePhone;
    private String emailId;
    private String addressType;

}
