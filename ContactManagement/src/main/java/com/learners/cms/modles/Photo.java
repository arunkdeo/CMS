package com.learners.cms.modles;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Pictures")
public class Photo {
    @Id
    private String id;

    private String contactId;

    private String title;

    private String description;

    private Binary image;
}
