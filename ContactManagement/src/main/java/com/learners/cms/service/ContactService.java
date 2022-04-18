package com.learners.cms.service;

import com.learners.cms.modles.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> getAllContacts();

    List<Contact> getAllContactsForAUser(String userId);

    List<Contact> getAllContactsWhereLastNameIs(String userId, String lastName);

    List<Contact> getAllContactsWhereFirstNameIs(String userId, String firstName);

    void createAContact(Contact contact);

    boolean updateContact(Contact contact);

    List<Contact> findContactsWith(String userName, String firstName, String lastName);
}
