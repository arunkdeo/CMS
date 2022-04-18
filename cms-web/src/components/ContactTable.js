import React, { Fragment, useEffect, useState } from "react";
const ContactTable = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (props.contacts !== null && props.contacts.length > 0) {
      setContacts(props.contacts);
    }
  }, [props.contacts]);
  return (
    <div className="card top-gap-between-component">
      <div className="card-header">
        <h5>Contacts that you already have</h5>
      </div>
      <div className="card-body div-shows-table">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Birth Date</th>
                <th scope="col">Married</th>
                <th scope="col">Occupation</th>
                <th scope="col">Socializable</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return (
                  <tr key={contact.id}>
                    <td scope="col">#</td>
                    <td scope="col">
                      {contact.title} {contact.firstName} {contact.lastName}
                    </td>
                    <td scope="col">{contact.gender}</td>
                    <td scope="col">
                      {contact.birthDate != null &&
                        contact.birthDate.toString()}
                    </td>
                    <td scope="col">{contact.isMarried}</td>
                    <td scope="col">{contact.occupation}</td>
                    <td scope="col">{contact.socializability}</td>
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

export default ContactTable;
