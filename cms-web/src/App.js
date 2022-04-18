import React, { useContext, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import CmsAuthContext from "./store/cms-auth-context";

function App() {
  const [loginInfo, setLoginInfo] = useState(null);
  const [isUserLogedIn, setIsUserLoggedIn] = useState(false);
  const authContext = useContext(CmsAuthContext);

  useEffect(() => {
    if (
      (loginInfo !== null &&
        loginInfo.userName !== null &&
        loginInfo.userName !== "" &&
        loginInfo.token !== null &&
        loginInfo.token !== "") ||
      (authContext.getCurrentUser() !== "" && authContext.getToken() !== "")
    ) {
      setIsUserLoggedIn(true);
    }
  }, [loginInfo]);

  const loginHandler = (authInfo) => {
    setLoginInfo(authInfo);
  };

  return (
    <>
      {isUserLogedIn ? <Layout email={authContext.getCurrentUser()}/> : <LoginPage loginHanlder={loginHandler} />}
    </>
  );
}

export default App;
