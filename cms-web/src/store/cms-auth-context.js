import React from "react";

const CmsAuthContext = React.createContext({
  userContacts: [],
  currentLoggedInUser: {
    userName: "",
    token: "",
  },
  setUserContacts: (contacts) => {},
  getUserContacts: () => {},  
  setCurrentUser: (loggedInUser)=>{},
  getCurrentUser: () => {},  
  getToken: ()=>{}
});

export default CmsAuthContext;
