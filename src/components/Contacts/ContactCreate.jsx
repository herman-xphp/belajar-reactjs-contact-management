import { useState } from "react";

import { useLocalStorage } from "react-use";
import { Link, useNavigate } from "react-router";

import { contactCreate } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import ContactForm from "./ContactForm";

export default function ContactCreate() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await contactCreate(token, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    });

    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact created successfully");
      await navigate("/dashboard/contacts");
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard/contacts"
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2" /> Back to Contacts
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New
            Contact
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <ContactForm
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setEmail={setEmail}
              setPhone={setPhone}
              handleSubmit={handleSubmit}
              submitLabel="Create Contact"
            />
          </div>
        </div>
      </div>
    </>
  );
}
