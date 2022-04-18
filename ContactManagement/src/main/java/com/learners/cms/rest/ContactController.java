package com.learners.cms.rest;

import com.learners.cms.modles.Contact;
import com.learners.cms.service.ContactService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = this.contactService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }
    @ResponseBody
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContactsForLoggedInUser(@NonNull @RequestHeader("userId") String userId) {
        log.info("Fetching Contacts for userId : {}",userId);
        List<Contact> contacts = this.contactService.getAllContactsForAUser(userId);
        log.info("Contacts {} fetched for: {}",contacts.size(), userId);
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @GetMapping("/{filterName}/{filterValue}")
    public ResponseEntity<List<Contact>> getAllContacts(@NonNull @RequestHeader("userId") String userId, @NonNull @PathVariable("filterName") String filterName, @NonNull @PathVariable("filterValue") String filterValue) {
        List<Contact> contacts = new ArrayList<>();
        if(filterName.equals("firstName")){
            contacts.addAll(this.contactService.getAllContactsWhereFirstNameIs(userId, filterValue));
        }else if(filterName.equals("lastName")) {
            contacts.addAll(this.contactService.getAllContactsWhereLastNameIs(userId, filterValue));
        }else {
            throw new RuntimeException("Not supported filter");
        }
        if(contacts.isEmpty()) {
            String msg = String.format("No contact found with %s = %s ", filterName, filterValue);
            throw new RuntimeException(msg);
        }
        return   new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @GetMapping("/filterByName")
    @ResponseBody
    public ResponseEntity<List<Contact>> getContactsByFirstAndLastName(@NonNull @RequestHeader("userId") String userId, HttpServletRequest request) {
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        List<Contact> contacts = new ArrayList<>();
        List<Contact> contactList = this.contactService.findContactsWith(userId, firstName, lastName);
        return new ResponseEntity<>(contactList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public void createContact(@NonNull @RequestHeader("userId") String userId, @NonNull @RequestBody Contact contact){
        contact.setUserNameRef(userId);
        this.contactService.createAContact(contact);
    }

    @PutMapping("/update/{contactId}")
    public void updateContact(@NonNull @RequestHeader("userId") String userId, @NonNull @RequestBody Contact contact){
        contact.setUserNameRef(userId);
        this.contactService.updateContact(contact);
    }
}
