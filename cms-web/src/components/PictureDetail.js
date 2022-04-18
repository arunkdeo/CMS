import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { buildHeaders } from "../libs/utils";
import CmsAuthContext from "../store/cms-auth-context";


const PictureDetail = (props) => {
  const authContext = useContext(CmsAuthContext);
    const picture={
        image:'',
        title:'',
        description:''
    }
  const BASE_API_URL = "http://localhost:8080/cms/";
  
  const [photo, setPhoto] = useState(picture);
  
 useEffect(() => {
      if(props.imageId !== undefined && props.imageId.trim() !==''){             
        fetchDataFromRemoteServer(BASE_API_URL + "photo/" + props.imageId);
      }
  }, [props.show]);

  const fetchDataFromRemoteServer = (completeURL) => {
    const requestOptions = buildHeaders("GET", authContext);
    const invokeRemoteApi = async () => {
      try {
        const httpResponse = await fetch(completeURL,requestOptions);
        if (!httpResponse.ok || httpResponse.status !== 200) {
          console.log("Remote call status code : " + httpResponse.status);
          throw new Error(httpResponse.status + "::" + httpResponse.statusText);
        }
        const responseData = await httpResponse.json();      
        setPhoto(responseData);        
      } catch (error) {
        console.error(`Error ${error}`);
      }
    };
    invokeRemoteApi();
  };
  
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{photo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className="row">
          <div className="col-md-12">
            {<img src={`data:image/png;base64,${photo.image}`} />}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5>Details of event-</h5>{photo.description}
          </div>
        </div></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PictureDetail;
