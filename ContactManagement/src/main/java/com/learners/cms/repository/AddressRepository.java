package com.learners.cms.repository;

import com.learners.cms.modles.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends MongoRepository<Address , String> {
    @Query("{contactId:?0}")
    List<Address> getAddressByContactId(String contactId);

    @Query("{contactId : {$in: [?0]}}")
    List<Address> getAddressForContacts(String contacts);
}
