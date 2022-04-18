import React from "react";

const ROOT_URL = "http://localhost:8080/cms";

export async function loginUser(loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    let response = await fetch(
      `${ROOT_URL}/authenticate/login`,
      requestOptions
    );
    let data = await response.json();
    if (data.userName && data.token) {
      return data;
    }
    console.log(data.errors[0]);
    return;
  } catch (error) {
    console.log(error);
  }
}

export const getRemoteRequest = async (completeURL, requestOptions) => {
  const response = [];
  const invokeRemoteApi = async () => {
    try {      
      const httpResponse = await fetch(completeURL, requestOptions);
      if (!httpResponse.ok || httpResponse.status !== 200) {
        console.log("Remote call status code : " + httpResponse.status);
        throw new Error(httpResponse.status + "::" + httpResponse.statusText);
      }
      const responseData = await httpResponse.json();
      for (let i in responseData) {
        response.push(responseData[i]);
      }            
    } catch (error) {
      console.error(`Error ${error}`);
    }
  };
  await invokeRemoteApi();
  return response;
};
export async function logout() {}
