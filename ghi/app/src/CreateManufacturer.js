import React, { useState } from "react";

function CreateManufacturer() {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name };
    const url = "http://localhost:8100/api/manufacturers/";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      setName("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 forms">
          <h1>Create a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="Manufacturer Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Manufacturer Name</label>
            </div>
            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateManufacturer;
