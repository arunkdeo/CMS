import React, { Fragment, useState } from "react";
import { Card, OverlayTrigger, Popover } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import PictureDetail from "./PictureDetail";
const PictureTable = (props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState('');

  const mouseActions = ["hover", "focus"];
  const openImageDetail = (imageId) => {
    setShowImageModal(!showImageModal);
    // console.log('Selected Image : ' + imageId);
    setSelectedImageId(imageId);
  };
  const handleClose = () => {
    setShowImageModal(false);
  };

  return (
    <Fragment>
      <Card className="top-gap-between-component">
        <Card.Header>
          <Card.Title>Pictures will appear here</Card.Title>
        </Card.Header>
        <Card.Body className="picdiv">
          {props.images.map((image, idx) => {
            return (
              <OverlayTrigger
              trigger={["hover", "hover"]}
                key={idx}
                placement={"top"}
                overlay={
                  <Popover id={`popover-positioned-top`}>
                    <Popover.Header as="h4">{image.title}</Popover.Header>
                    <Popover.Body>{image.description}</Popover.Body>
                  </Popover>
                }
              >
                <Image
                  className="img-thumbnail"
                  key={image.id}
                  src={`data:image/png;base64,${image.image}`}
                  alt={image.title}
                  thumbnail="true"
                  rounded="true"
                  onClick={openImageDetail.bind(this, image.id)}
                />
              </OverlayTrigger>
            );
          })}
        </Card.Body>
      </Card>

      <PictureDetail show={showImageModal} imageId={selectedImageId} handleClose={handleClose}/>
    </Fragment>
  );
};
export default PictureTable;
