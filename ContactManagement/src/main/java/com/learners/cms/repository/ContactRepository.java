package com.learners.cms.repository;

import com.learners.cms.modles.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    @Query("{userNameRef:'?0',$and: [{firstName:{ $regex:/^?1/}}]}") //firstName like 'xxxx%' -> symbol ^ is for like operation and check name begins with
    List<Contact> findContactByFirstName(String userId, String firstName);

    @Query("{userNameRef:'?0',$and: [{lastName:{ $regex:/^?1/}}]}") //lastName like 'xxxx%' -> symbol ^ is for like operation and check name begins with
    List<Contact> findContactByLastName(String userId, String lastName);

    @Query("{userNameRef:'?0', $and:[{firstName:'?1'}], $or:[{lastName:{ $regex:/^?2/}}]}")
    List<Contact> findContactByFirstNameAndLastName(String userId, String firstName, String lastName);
    @Query("{userNameRef:'?0'}")
    List<Contact> findContactByUserNameRef(String userId);
}
