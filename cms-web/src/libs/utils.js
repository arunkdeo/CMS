export const isNonEmpty=(value)=>{
    if(value && value !== null  && value.trim().length >0){
      return true;
    }
    return false;
  };

  export const buildHeaders=(method, authContext, body)=>{
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authContext.getToken(),
        userId: authContext.getCurrentUser(),        
      },
      body
    };
    return requestOptions;
  }