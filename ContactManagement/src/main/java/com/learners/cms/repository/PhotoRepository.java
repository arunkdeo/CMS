package com.learners.cms.repository;

import com.learners.cms.modles.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends MongoRepository<Photo, String> {

    @Query("{contactId:?0}")
    List<Photo> getAllPhotoForAContact(String contactId);
}
