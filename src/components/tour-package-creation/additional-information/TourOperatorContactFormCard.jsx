import React, { useState } from "react";
import TourOperatorContactForm from "./TourOperatorContactForm";
import Button from "../shared/Button";

const TourOperatorContactFormCard = () => {
  const [contacts, setContacts] = useState([{ id: 1 }]);

  const addNewContact = () => {
    if (contacts.length < 4) {
      setContacts([...contacts, { id: Date.now() }]);
    }
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="p-6 space-y-8 max-w-9xl border-4 border-[#1D777D] rounded-lg mx-auto">
      <h2 className="text-sm font-semibold mb-4">Contact details for the tour operator (up to 4 contact)<span className="text-red-500">*</span></h2>
      <TourOperatorContactForm />

      {contacts.slice(1).map((contact) => (
        <div key={contact.id} className="relative">
          <TourOperatorContactForm />
          <div className="flex justify-end mt-2">
            <Button
              text="Delete"
              className="bg-red-600 hover:bg-red-500"
              onClick={() => removeContact(contact.id)}
            />
          </div>
        </div>
      ))}

      {contacts.length < 4 && (
        <Button text="Add Contact" onClick={addNewContact} />
      )}
    </div>
  );
};

export default TourOperatorContactFormCard;
