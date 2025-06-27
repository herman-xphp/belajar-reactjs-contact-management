import { useState } from "react";

import { useEffectOnce, useLocalStorage } from "react-use";
import { Link, useNavigate, useParams } from "react-router";

import { contactDetail } from "../../lib/api/ContactApi";
import { addressCreate } from "../../lib/api/AddressApi";
import { alertError, alertSuccess } from "../../lib/alert";
import AddressForm from "./AddressForm";

export default function AddressCreate() {
  const { id } = useParams();
  const [token, _] = useLocalStorage("token", "");
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");

  async function fetchContact() {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await addressCreate(token, id, {
      street: street,
      city: city,
      province: province,
      country: country,
      postal_code: postal_code,
    });

    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Address created successfully");
      await navigate(`/dashboard/contacts/${id}`);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() => console.log("Contact fetched successfully"));
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link
            to={`/dashboard/contacts/${id}`}
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-plus-circle text-blue-400 mr-3" /> Add New
            Address
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            {/* Contact Information */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {contact.first_name}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {contact.email} • {contact.phone}
                  </p>
                </div>
              </div>
            </div>
            <AddressForm
              id={id}
              street={street}
              setStreet={setStreet}
              city={city}
              setCity={setCity}
              province={province}
              setProvince={setProvince}
              country={country}
              setCountry={setCountry}
              postal_code={postal_code}
              setPostalCode={setPostalCode}
              handleSubmit={handleSubmit}
              submitLabel="Add Address"
            />
          </div>
        </div>
      </div>
    </>
  );
}
