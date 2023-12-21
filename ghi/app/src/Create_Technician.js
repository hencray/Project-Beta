import React, { useState } from 'react';

function Create_Technician() {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
    employee_numbers: [],
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleFirstNameChange = (event) => {
    setValues({ ...values, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setValues({ ...values, last_name: event.target.value });
  };

  const handleEmployeeIDChange = (event) => {
    setValues({ ...values, employee_id: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (values.first_name && values.last_name && values.employee_id) {
      setValid(true);
    }
    const newTechnician = {
      first_name: values.first_name,
      last_name: values.last_name,
      employee_id: values.employee_id,
    };

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(newTechnician),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(technicianUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setValues(values);
        setSubmitted(true);
      })
      .catch((e) => console.log('error:', e));
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 forms">
          <h1>Create a new Technician</h1>
          <form onSubmit={handleSubmit} id="create-Technician-form">
            {submitted && valid ? (
              <div>Success! Thank you for creating a Technician</div>
            ) : null}

            <div className="form-floating mb-3">
              <input
                value={values.first_name}
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
              {submitted && !values.first_name ? (
                <span>Please enter a first name</span>
              ) : null}
            </div>

            <div className="form-floating mb-3">
              <input
                value={values.last_name}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
              {submitted && !values.last_name ? (
                <span>Please enter a last name</span>
              ) : null}
            </div>

            <div className="form-floating mb-3">
              <input
                value={values.employee_id}
                onChange={handleEmployeeIDChange}
                placeholder="Employee Id"
                required
                type="number"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
              {submitted && !values.employee_number ? (
                <span>Please enter an employee ID</span>
              ) : null}
            </div>
            <button className="btn btn-dark buttons">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create_Technician;
