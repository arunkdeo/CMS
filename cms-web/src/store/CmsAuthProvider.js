import React, { useReducer } from "react";
import CmsAuthContext from "./cms-auth-context";

const defaultAuthState = {
  userContacts: [],
  currentLogedInUser: {
    userName: "",
    token: "",
  },
};

const authReducer = (state, action) => {
  if (action.type === "SET_USER") {
    defaultAuthState.currentLogedInUser = action.loggedInUser;
    sessionStorage.setItem("currentUser", JSON.stringify(action.loggedInUser));
    console.log("Current User Saved IN local Storage");
  }
  if (action.type === "SET_CONTACTS") {
    defaultAuthState.userContacts = action.userContacts;
    sessionStorage.setItem("usercontacts", JSON.stringify(action.contacts));
    console.log("Current User contact saved local Storage");
  }
  if (action.type === "GET_CONTACTS") {
    if (
      validateStorageValue(JSON.parse(sessionStorage.getItem("currentUser")))
    ) {
      defaultAuthState.contacts = sessionStorage.getItem("usercontacts");
    }
  }
  if (action.type === "GET_USER") {
    if (
      validateStorageValue(JSON.parse(sessionStorage.getItem("currentUser")))
    ) {
      defaultAuthState.currentLogedInUser.userName = JSON.parse(
        sessionStorage.getItem("currentUser")
      ).userName;
    }
  }
  if (action.type === "GET_TOKEN") {
    if (
      validateStorageValue(JSON.parse(sessionStorage.getItem("currentUser")))
    ) {
      defaultAuthState.currentLogedInUser.token = JSON.parse(
        sessionStorage.getItem("currentUser")
      ).token;
    }
  }
  return defaultAuthState;
};
const validateStorageValue = (value) => {
  if (value !== undefined && value !== null) {
    return true;
  }
  return false;
};
const CmsAuthProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);
  const setContactsHandler = (contacts) => {
    dispatch({ type: "SET_CONTACTS", userContacts: contacts });
  };
  const getContactHandler = () => {
    dispatch({ type: "GET_CONTACTS" });
    return authState.currentLogedInUser.contacts;
  };
  const getCurrentUserHandler = () => {
    dispatch({ type: "GET_USER" });
    return authState.currentLogedInUser.userName;
  };
  const setCurrentUserHandler = (loggedInUser) => {
    dispatch({ type: "SET_USER", loggedInUser: loggedInUser });
  };
  const readTokenHandler = () => {
    dispatch({ type: "GET_TOKEN" });
    return authState.currentLogedInUser.token;
  };

  const cmsAuthContext = {
    userContacts: authState.userContacts,
    currentLogedInUser: authState.currentLogedInUser,
    setUserContacts: setContactsHandler,
    getUserContacts: getContactHandler,
    getCurrentUser: getCurrentUserHandler,
    setCurrentUser: setCurrentUserHandler,
    getToken: readTokenHandler,
  };

  return (
    <CmsAuthContext.Provider value={cmsAuthContext}>
      {props.children}
    </CmsAuthContext.Provider>
  );
};

export default CmsAuthProvider;
