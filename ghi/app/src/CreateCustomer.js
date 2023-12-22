import React, { useState } from "react";

function CreateCustomer() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name,
      last_name,
      address,
      phone_number,
    };

    const json = JSON.stringify(data);
    const url = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "POST",
      body: json,
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFirstName("");
      setLastName("");
      setAddress("");
      setPhoneNumber("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 forms">
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={first_name}
                required
                placeholder="First Name"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={last_name}
                required
                placeholder="Last Name"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                value={address}
                required
                placeholder="Address"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneNumberChange}
                value={phone_number}
                required
                placeholder="Phone Number"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
