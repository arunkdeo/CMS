import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";

const AddressTable = (props) => {
  return (
    <div className="card top-gap-between-component">
      <div className="card-header">
        <h5>Contact addresses available</h5>
      </div>
      <div className="card-body div-shows-table">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Address1</th>
                <th scope="col">city</th>
                <th scope="col">state</th>
                <th scope="col">Country</th>
                <th scope="col">Home Phone</th>
                <th scope="col">Mobile</th>
                <th scope="col">@Email</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {props.addressList.map((address) => {
                return (
                  <tr key={address.id}>
                    <td scope="col">{address.address1}</td>
                    <td scope="col">{address.city}</td>
                    <td scope="col">{address.state}</td>
                    <td scope="col">{address.country}</td>
                    <td scope="col">{address.homePhone}</td>
                    <td scope="col">{address.mobileNo}</td>
                    <td scope="col">{address.emailId}</td>
                    <td scope="col">{address.addressType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddressTable;
