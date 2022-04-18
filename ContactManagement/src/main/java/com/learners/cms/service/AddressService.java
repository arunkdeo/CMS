package com.learners.cms.service;

import com.learners.cms.modles.Address;

import java.util.List;

public interface AddressService {

    void saveAnAddress(Address address);

    void removeAnAddress(String addressId);

    List<Address> getAddressesOfAContact(String contactId);

    List<Address> getAllAddressOfContactsForAUser(String userId);

    Address getAnAddress(String addressId);
}
