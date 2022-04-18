import { Fragment, useEffect, useState } from "react";
import { FailedMessage, SuccessMessage } from "./FlashMessage";

const ContactDashboard = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (props.isSuccess !== null && isNonEmpty(props.responseMessage)) {
      setIsSuccess(props.isSuccess);
      setMessage(props.responseMessage);
    }
  }, [props.isSuccess, props.responseMessage]);

  const isNonEmpty = (value) => {
    if (value && value !== null && value.trim().length > 0) {
      return true;
    }
    return false;
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div>
          <h1 className="h2">{props.pageTitle}</h1>
        </div>
        <div>
          {message !== null && isSuccess && (
            <SuccessMessage
              duration={5000}
              message={props.responseMessage}
              persistOnHover={true}
            />
          )}
          {message !== null && !isSuccess && (
            <FailedMessage
              duration={5000}
              message={props.responseMessage}
              persistOnHover={true}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ContactDashboard;
