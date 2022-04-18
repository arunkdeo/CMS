import React, { useContext } from "react";
import LoginForm from "../auth/LoginForm";
import CmsAuthContext from "../store/cms-auth-context";

const LoginPage = (props) => {
  const authContext = useContext(CmsAuthContext);

  const handleUserLogin = (loginInfo) => {
    const { userName, token } = loginInfo;    
    if (
      userName != null &&
      userName.trim() !== "" &&
      token != null &&
      token.trim() !== ""
    ) {
      // User successfully loged in. Fetch the contacts belongs to user.
      authContext.setCurrentUser(loginInfo);      
      
    }
    props.loginHanlder(loginInfo);
  };

  return <LoginForm handleUserLogin={handleUserLogin} />;
};

export default LoginPage;
