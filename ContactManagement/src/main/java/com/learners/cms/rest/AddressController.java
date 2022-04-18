package com.learners.cms.rest;

import com.learners.cms.modles.Address;
import com.learners.cms.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getAddressesForAUser(@PathVariable("userId") String userId){
        List<Address> addressList = addressService.getAllAddressOfContactsForAUser(userId);
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @GetMapping("/contact/{contactId}") //Get All addresses for a given Contact
    public ResponseEntity<List<Address>> getAddresses(@NonNull @PathVariable("contactId") String contactId){
        List<Address> addressList = addressService.getAddressesOfAContact(contactId);

        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<Address> getAnAddress(@NonNull @PathVariable("addressId") String addressId){
        Address address = addressService.getAnAddress(addressId);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @PostMapping("/create")
    public void createAnAddress(@NonNull @RequestBody Address address){
        this.addressService.saveAnAddress(address);
    }

}
