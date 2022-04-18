package com.learners.cms.service;

import com.learners.cms.modles.Contact;
import com.learners.cms.repository.ContactRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Log4j2
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public List<Contact> getAllContacts() {
        log.info("Fetching all the contacts");
        List<Contact> contacts = this.contactRepository.findAll();
        if (contacts != null && !contacts.isEmpty()) {
            contacts.sort((c1, c2) -> c1.getFirstName().compareTo(c2.getFirstName()));
        }
        return contacts;
    }

    @Override
    public List<Contact> getAllContactsForAUser(String userId) {
        log.info("Fetching all the contacts for UserId: {}", userId);
        List<Contact> contacts = contactRepository.findContactByUserNameRef(userId);
        if (contacts != null && !contacts.isEmpty()) {
            contacts.sort((c1, c2) -> c1.getFirstName().compareTo(c2.getFirstName()));
        }
        return contacts;
    }

    @Override
    public List<Contact> getAllContactsWhereLastNameIs(String userId, String lastName) {
        log.info("Fetching all the contacts with lastName : {} ", lastName);
        List<Contact> contacts = this.contactRepository.findContactByLastName(userId, lastName);
        if (contacts != null && !contacts.isEmpty()) {
            contacts.sort((c1, c2) -> c1.getFirstName().compareTo(c2.getFirstName()));
        }
        return contacts;
    }

    @Override
    public List<Contact> getAllContactsWhereFirstNameIs(String userId, String firstName) {
        log.info("Fetching all the contacts with firstName : {} ", firstName);
        List<Contact> contacts = this.contactRepository.findContactByFirstName(userId, firstName);
        if (contacts != null && !contacts.isEmpty()) {
            contacts.sort((c1, c2) -> c1.getLastName().compareTo(c2.getLastName()));
        }
        return contacts;
    }

    @Override
    public void createAContact(Contact contact) {
        log.info("Creating a new Contact with firstName: {} and lastName: {}",contact.getFirstName(), contact.getLastName());
        this.contactRepository.insert(contact);
        log.info("New Contact created with firstName: {} and lastName: {}",contact.getFirstName(), contact.getLastName());
    }

    @Override
    public boolean updateContact(Contact contact) {
        log.info("Updating Existing Contact with firstName: {}", contact.getId());
        Contact savedContact = this.contactRepository.save(contact);
        return Objects.nonNull(savedContact) ? true : false;
    }

    @Override
    public List<Contact> findContactsWith(String userName, String firstName, String lastName) {
        log.info("Fetching all the contacts with firstName {} and lastName: {}",firstName, lastName);
        return this.contactRepository.findContactByFirstNameAndLastName(userName, firstName, lastName);

    }


}
