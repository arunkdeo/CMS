import React, { Fragment, useEffect, useState, useContext } from "react";
import AlertPopup from "../components/AlertPopup";
import ContactDashboard from "../components/ContactDashboard";

import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";
import CmsAuthContext from "../store/cms-auth-context";
import { getRemoteRequest } from "../auth/CMSActions";
import { buildHeaders, isNonEmpty } from "../libs/utils";
const BASE_API_URL = "http://ramarun-aio:8080/cms/";

const Contact = () => {
  const [title, setTitle] = useState();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [isSuccess, setIsuccess] = useState();
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isMarried, setIsMarried] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [occupation, setOccupation] = useState("");
  const [socializability, setSocializability] = useState("");
  const authContext = useContext(CmsAuthContext);

  /**
   * Fetch Contact on load and on filter.
   */
  const fetchContacts = async (completeURL) => {
    const requestOptions = buildHeaders("GET", authContext);
    try {      
      const contactsReceived = await getRemoteRequest(completeURL, requestOptions);
      console.log("Contacts Received : " + contactsReceived);
      setContacts(contactsReceived);
    } catch (error) {
      console.error(`Error ${error}`);
    }
  };

  useEffect(() => {
    let url = BASE_API_URL;
    if (isNonEmpty(firstName) && !isNonEmpty(lastName)) {
      console.log("Fetching contact by first Name.");
      url = BASE_API_URL + `contact/firstName/` + firstName;
    } else if (isNonEmpty(firstName) && isNonEmpty(lastName)) {
      console.log("Fetching contact by first & last Name.");
      url =
        BASE_API_URL +
        `contact/filterByName?firstName=` +
        firstName +
        `&lastName=` +
        lastName;
    } else if (!isNonEmpty(firstName) && isNonEmpty(lastName)) {
      console.log("Fetching contact by last Name.");
      url = BASE_API_URL + `contact/lastName/` + lastName;
    } else if (!isNonEmpty(firstName) && !isNonEmpty(lastName)) {
      url = BASE_API_URL + `contact`;
    }

    if (url !== BASE_API_URL) {
       fetchContacts(url);      
    }
  }, [firstName, lastName]);

  const handleMarriageChange = (event) => {
    setIsMarried(event.target.value);
  };
  const handleWeddingDateChange = (event) => {
    setWeddingDate(event.target.value);
  };
  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };
  const handleSocializabilityChange = (event) => {
    setSocializability(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    //setFirstName(event.target.value);
    //Just skip the is call
  };

  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    // setLastName(event.target.value);
    //Just skip the is call
  };

  const handleFirstNameFocusLost = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameFocusLost = (event) => {
    setLastName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const contactData = JSON.stringify({
      title,
      firstName,
      middleName,
      lastName,
      gender,
      birthDate,
      isMarried,
      weddingDate,
      occupation,
      socializability,
    });

    submitContactForm(contactData);
    handleClear();
  };

  const handleClear = () => {
    setTitle("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("");
    setBirthDate("");
    setIsMarried("");
    setWeddingDate("");
    setOccupation("");
    setSocializability("");
  };
  /**
   * Submit Contact form to create a new Contact.
   */
  const submitContactForm = (contactData) => {
    const requestOptions = buildHeaders("POST", authContext, contactData);        
    const url = "http://ramarun-aio:8080/cms/contact/create";
    fetch(url, requestOptions)
      .then((response) => {
        console.log(
          "Status code : " + response.status + " Text : " + response.statusText
        );
        if (response.status === 200) {
          setResponseMessage(
            "Status : " +
              response.status +
              ": Contact Added successfully with Name : " +
              firstName +
              " " +
              lastName
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
        fetchContacts("http://ramarun-aio:8080/cms/contact");
      })
      .catch((error) => {
        setResponseMessage(
          "Encountered Error while creating contact : " +
            firstName +
            " : " +
            error
        );
        setIsuccess(false);
      });
    setShowDialog(false);
  };
  const handleCancel = () => {
    setShowDialog(false);
  };
  const handleConfirm = () => {
    if (!isNonEmpty(firstName) || !isNonEmpty(lastName)) {
      setResponseMessage(
        "Make sure that First name and last name are provided."
      );
      setIsuccess(false);
    } else {
      setShowDialog(true);
      setAlertMessage("Are you sure want to save the change in contact ?");
    }
  };

  return (
    <Fragment>
      <ContactDashboard
        pageTitle={`Contact Demography`}
        isSuccess={isSuccess}
        responseMessage={responseMessage}
      />
      <ContactForm
        firstNameChangedHandler={handleFirstNameChange}
        lastNameChangeHandler={handleLastNameChange}
        middleNameChangeHandler={handleMiddleNameChange}
        titleChangeHandler={handleTitleChange}
        genderChangeHandler={handleGenderChange}
        birthDateChangeHanlder={handleBirthDateChange}
        marriageChangeHandler={handleMarriageChange}
        weddingDateChangeHandler={handleWeddingDateChange}
        occupationChangeHandler={handleOccupationChange}
        socializabilityChangeHandler={handleSocializabilityChange}
        submitContactForm={handleConfirm}
        handleClear={handleClear}
        firstNameBlureHandler={handleFirstNameFocusLost}
        lastNameBlurHandler={handleLastNameFocusLost}
        handleCancel={handleCancel}
      />
      <ContactTable contacts={contacts} />
      <AlertPopup
        bodymessage={alertMessage}
        showDialog={showDialog}
        handleConfirm={handleSubmit}
        handleClose={handleCancel}
      />
    </Fragment>
  );
};

export default Contact;
