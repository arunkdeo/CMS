import React, { Fragment, useContext, useEffect, useState } from "react";
import { getRemoteRequest } from "../auth/CMSActions";
import ContactDashboard from "../components/ContactDashboard";
import PictureForm from "../components/PictureForm";
import PictureTable from "../components/PictureTable";
import { buildHeaders } from "../libs/utils";
import CmsAuthContext from "../store/cms-auth-context";

const Photos = () => {
  const BASE_API_URL = "http://ramarun-aio:8080/cms/";
  const authContext = useContext(CmsAuthContext);
  const [contacts, setContacts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPic, setSelectedPic] = useState(null);
  const [preview, setPreview] = useState();
  const [contactId, setContactId] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSuccess, setIsuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [pictures, setPictures] = useState([]);


  const fetchDataFromRemoteServer = async (completeURL, api) => {
    const requestOptions = buildHeaders("GET", authContext);
    try{
      const contactsReceived = await getRemoteRequest(completeURL, requestOptions);           
      if(api === 'Contact'){
        setContacts(contactsReceived);
      }else{
        setPictures(contactsReceived);
      }
    }catch(error){
      console.log("Error occurred :" + error);
    }    
  };

  const clearFormHandler = ()=>{
    setSelectedPic(null);
  }

  useEffect(()=>{
    fetchDataFromRemoteServer(BASE_API_URL + "contact", "Contact");
  },[]);

  useEffect(() => {
    
    if (!selectedPic) {
      setPreview(undefined);
      return;
    }
    
    const objectUrl = URL.createObjectURL(selectedPic);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedPic]);

  const titleChangeHnadler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChangeHnadler = (event) => {
    setDescription(event.target.value);
  };
  const imageChangeHnadler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedPic(undefined);
      return;
    }
    setSelectedPic(event.target.files[0]);
  };

  const contactChangeHandler = (event) => {
    const _contactId = event.target.value;
    setContactId(_contactId);
    if (_contactId === null || _contactId === "Choose..." || _contactId === 'undefined') {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
      //Fetch all pictrues for a selected contact
      fetchDataFromRemoteServer(BASE_API_URL + "photo/contact/" + _contactId, 'Pictures');
    }
  };
  /**
   * Submit form using fetch api
   */
  const submitContactForm = (formData) => {
    const requestOptions = {
      method: "POST",      
      body: formData,
      headers:{
        Authorization: "Bearer " + authContext.getToken(),
        'Accept':'multipart/form-data',
      }
    };
    
    const url = "http://ramarun-aio:8080/cms/photo/add";
    fetch(url, requestOptions)
      .then((response) => {        
        console.log(
          "Status code : " + response.status + " Text : " + response.statusText
        );
        if (response.status === 200) {
          setResponseMessage(
            "Status : " +
              response.status +
              ": Photo uploaded successfully wiht title :" +
              title
          );
          setIsuccess(true);
          fetchDataFromRemoteServer('http://ramarun-aio:8080/cms/photo/contact/'+formData.get('contactId'));
          
        } else {
          setResponseMessage(
            "Status code : " +
              response.status +
              " Text : " +
              response.statusText
          );
          setIsuccess(false);
        }
      })
      .catch((error) => {
        setResponseMessage(
          "Encountered Error while creating contact : " + error
        );
        setIsuccess(false);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedPic);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("contactId", contactId);
    
    if(selectedPic === undefined || selectedPic === null){
      setResponseMessage("You have not selected a photo to upload");
      setIsuccess(false);
      return;
    }else if(title === undefined || title === null || title.trim() === ''){
      setResponseMessage("You have not provided caption for photo you are uploading");
      setIsuccess(false);
      return;
    }else if(description === undefined || description === null || description.trim() === ''){
      setResponseMessage("You have not provided details of event when photo was taken");
      setIsuccess(false);
      return;
    }
    submitContactForm(formData);
  };
  return (
    <Fragment>
      <ContactDashboard
        pageTitle={`Contact Photos`}
        isSuccess={isSuccess}
        responseMessage={responseMessage}
      />
      <PictureForm
        isEnabled={isEnabled}
        contacts={contacts}
        contactChangeHandler={contactChangeHandler}
        imageChangeHnadler={imageChangeHnadler}
        preview={preview}
        titleChangeHnadler={titleChangeHnadler}
        descriptionChangeHnadler={descriptionChangeHnadler}
        submitHandler={submitHandler}
        clearForm = {clearFormHandler}
      />
      <PictureTable images={pictures} />
    </Fragment>
  );
};

export default Photos;
