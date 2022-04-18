import React, { Fragment, useContext, useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import AddressTable from "../components/AddressTable";
import AlertPopup from "../components/AlertPopup";
import ContactDashboard from "../components/ContactDashboard";
import CmsAuthContext from "../store/cms-auth-context";
import { getRemoteRequest } from "../auth/CMSActions";
import { buildHeaders } from "../libs/utils"; 

const Address = () => {
  const BASE_API_URL = "http://ramarun-aio:8080/cms/";
  const authContext = useContext(CmsAuthContext);
  const [contacts, setContacts] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [contactId, setContactId] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [alternateMobileNo, setAlternateMobileNo] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [emailId, setEmailId] = useState("");
  const [addressType, setAddressType] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  
  const fetchDataFromRemoteServer = async (completeURL, api) => {
    const requestOptions = buildHeaders("GET", authContext);
    try{
      const contactsReceived = await getRemoteRequest(completeURL, requestOptions);
      console.log("Response Received : " + contactsReceived);      
      if(api === 'Contact'){
        setContacts(contactsReceived);
      }else{
        setAddressList(contactsReceived);
      }
    }catch(error){
      console.log("Error occurred :" + error);
    }    
  };

  const address1ChangeHandler = (event) => {
    setAddress1(event.target.value);
  };
  const address2ChangeHandler = (event) => {
    setAddress2(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };
  const countryChangeHandler = (event) => {
    setCountry(event.target.value);
  };
  const zipChangeHandler = (event) => {
    setZip(event.target.value);
  };
  const mobileNoChangeHandler = (event) => {
    setMobileNo(event.target.value);
  };
  const alternateMobileNoChangeHandler = (event) => {
    setAlternateMobileNo(event.target.value);
  };
  const homePhoneChangeHandler = (event) => {
    setHomePhone(event.target.value);
  };
  const officePhoneChangeHandler = (event) => {
    setOfficePhone(event.target.value);
  };
  const emailIdChangeHandler = (event) => {
    setEmailId(event.target.value);
  };
  const addressTypeChangeHandler = (event) => {
    setAddressType(event.target.value);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    fetchDataFromRemoteServer(BASE_API_URL + "contact", "Contact");
  }, []);

  const contactChangeHandler = (event) => {
    const _contactId = event.target.value;
    setContactId(_contactId);
    if (_contactId === null || _contactId === "Choose...") {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
      //Fetch addresses for a selected contact
      fetchDataFromRemoteServer(
        BASE_API_URL + "address/contact/" + _contactId,
        "Address"
      );
    }
  };

  const addressSubmitHandler = (event) => {
    event.preventDefault();
    const addressData = JSON.stringify({
      contactId,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      mobileNo,
      alternateMobileNo,
      homePhone,
      officePhone,
      emailId,
      addressType,
    });
    submitAddressForm(addressData);
    restForm();
  };

  const restForm = () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.value = "";
    });
    Array.from(document.querySelectorAll("select")).forEach((input) => {
      input.value = "Choose...";
    });
    handleClear();
  };

  const handleClear = () => {
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
    setMobileNo("");
    setAlternateMobileNo("");
    setHomePhone("");
    setOfficePhone("");
    setEmailId("");
    setAddressType("");
    setIsEnabled(false);
  };

  const isNonEmpty = (value) => {
    if (value && value !== null && value.trim().length > 0) {
      return true;
    }
    return false;
  };
  const handleConfirm = () => {
    if (!isNonEmpty(address1) || !isNonEmpty(city) || !isNonEmpty(state)) {
      setResponseMessage(
        "Make sure that Address1, City and State are provided."
      );
      setIsuccess(false);
    } else {
      setShowDialog(true);
      setAlertMessage("Are you sure want to save the change in contact ?");
    }
  };

  const submitAddressForm = (addressData) => {
    const requestOptions = buildHeaders('POST', authContext, addressData);        
    const url = "http://ramarun-aio:8080/cms/address/create";
    fetch(url, requestOptions)
      .then((response) => {
        console.log(
          "Status code : " + response.status + " Text : " + response.statusText
        );
        if (response.status === 200) {
          setResponseMessage(
            "Status : " +
              response.status +
              ": Address Added successfully for contact Id : " +
              contactId
          );
          setIsuccess(true);
        } else {
          setResponseMessage(
            "Status code : " +
              response.status +
              " Text : " +
              response.statusText
          );
          setIsuccess(false);
        }
        fetchDataFromRemoteServer(
          "http://ramarun-aio:8080/cms/address/contact/" + contactId,
          "Address"
        );
      })
      .catch((error) => {
        setResponseMessage(
          "Encountered Error while saving address data." + error
        );
        setIsuccess(false);
      });
    setShowDialog(false);
  };
  return (
    <Fragment>
      <ContactDashboard
        pageTitle={`Contact Address`}
        isSuccess={isSuccess}
        responseMessage={responseMessage}
      />
      <AddressForm
        isEnabled={isEnabled}
        contacts={contacts}
        contactChangeHandler={contactChangeHandler}
        address1ChangeHandler={address1ChangeHandler}
        address2ChangeHandler={address2ChangeHandler}
        cityChangeHandler={cityChangeHandler}
        stateChangeHandler={stateChangeHandler}
        countryChangeHandler={countryChangeHandler}
        zipChangeHandler={zipChangeHandler}
        mobileNoChangeHandler={mobileNoChangeHandler}
        alternateMobileNoChangeHandler={alternateMobileNoChangeHandler}
        homePhoneChangeHandler={homePhoneChangeHandler}
        officePhoneChangeHandler={officePhoneChangeHandler}
        emailIdChangeHandler={emailIdChangeHandler}
        addressTypeChangeHandler={addressTypeChangeHandler}
        submitFormHandler={handleConfirm}
        handleClear={restForm}
      />
      <AddressTable addressList={addressList} />
      <AlertPopup
        bodymessage={alertMessage}
        showDialog={showDialog}
        handleConfirm={addressSubmitHandler}
        handleClose={handleCancel}
      />
    </Fragment>
  );
};

export default Address;
