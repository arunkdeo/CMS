package com.learners.cms.service;

import com.learners.cms.exception.NoDataFoundException;
import com.learners.cms.modles.Address;
import com.learners.cms.modles.Contact;
import com.learners.cms.repository.AddressRepository;
import com.learners.cms.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository repository;
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void saveAnAddress(Address address) {
        this.repository.insert(address);
    }

    @Override
    public void removeAnAddress(String addressId) {

    }

    @Override
    public List<Address> getAddressesOfAContact(String contactId) {
        return repository.getAddressByContactId(contactId);
    }

    @Override
    public List<Address> getAllAddressOfContactsForAUser(String userId) {
        //First fetch the contacts of user
        List<Contact> contactList = contactRepository.findContactByUserNameRef(userId);
        if (CollectionUtils.isEmpty(contactList)) {
            throw new NoDataFoundException("No Contacts available for user : " + userId);
        }
        Set<String> contactsIds = contactList.stream()
                .map(Contact::getId).collect(Collectors.toSet());
        //Then fetch all the address of resulting contacts
        StringBuilder params = new StringBuilder();
        contactsIds.stream().forEach(s->{
            params.append("'").append(s).append("'").append(",");
        });
        params.replace(params.lastIndexOf("',"),params.lastIndexOf(",")+1,"");
        params.replace(params.indexOf("'"),params.indexOf("'")+1,"");
//        List<Address> addressForContacts = repository.getAddressForContacts(Arrays.copyOf(contactsIds.toArray(), contactsIds.size(), String[].class));
        List<Address> addressForContacts = repository.getAddressForContacts(params.toString());
        return addressForContacts;

    }

    @Override
    public Address getAnAddress(String addressId) {
        Optional<Address> address = repository.findById(addressId);
        return address.orElseThrow(() -> new NoDataFoundException("No Address found with address Id: " + addressId)); //if value is present then return else throw NoSuchElement exception.

    }
}
