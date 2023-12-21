import React, { useState, useEffect } from 'react';

const Create_Appointment = () => {
  const [values, setValues] = useState({
    vin: '',
    customer: '',
    date_time: '',
    reason: '',
    technician: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/technicians/')
      .then(response => response.json())
      .then(data => setTechnicians(data.technician))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleVinChange = event => {
    setValues({ ...values, vin: event.target.value });
  };

  const handleCustomerChange = event => {
    setValues({ ...values, customer: event.target.value });
  };

  const handleDateTimeChange = event => {
    setValues({ ...values, date_time: event.target.value });
  };

  const handleReasonChange = event => {
    setValues({ ...values, reason: event.target.value });
  };

  const handleTechnicianChange = event => {
    setValues({ ...values, technician: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);

    if (values.vin && values.customer && values.date_time && values.reason && values.technician) {
      setValid(true);
    }

    const newAppointment = {
      vin: values.vin,
      customer: values.customer,
      date_time: values.date_time,
      reason: values.reason,
      technician: values.technician,
    };

    fetch('http://localhost:8080/api/appointments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    })
      .then(response => response.json())
      .then(() => {
        setValues({
          vin: '',
          customer: '',
          date_time: '',
          reason: '',
          technician: '',
        });
        setSubmitted(true);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 forms">
          <h1>Create a new Appointment</h1>
          <form onSubmit={handleSubmit} id="create-Appointment-form">
            {submitted && valid ? <div>Success! You created an Appointment</div> : null}

            <div className="form-floating mb-3">
              <input
                value={values.vin}
                onChange={handleVinChange}
                placeholder="Vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Vin</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={values.customer}
                onChange={handleCustomerChange}
                placeholder="Customer"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={values.date_time}
                onChange={handleDateTimeChange}
                placeholder="Date and Time"
                required
                type="text"
                name="date_time"
                id="date_time"
                className="form-control"
              />
              <label htmlFor="date_time">Date and Time</label>
            </div>

            <div className="form-floating mb-3">
              <input
                value={values.reason}
                onChange={handleReasonChange}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>

            <div className="mb-3">
            <select
                value={values.technician}
                onChange={handleTechnicianChange}
                required
                name="technician"
                className="form-select"
              >

                <option value="">Choose a technician</option>
                  {technicians.map(tech => (
                <option key={tech.id} value={tech.id}>
                  {`${tech.first_name} ${tech.last_name}`}
                </option>
              ))}
            </select>
            </div>

            <button className="btn btn-dark buttons">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Appointment;
