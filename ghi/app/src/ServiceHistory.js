import React, { useEffect, useState } from 'react';

const ServiceHistory = () => {
  const [searchInput, setSearchInput] = useState('');
  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/appointments/')
      .then(response => response.json())
      .then(data => {
        setServiceAppointments(data.Appointments);
        setFilteredAppointments(data.Appointments);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredAppointments(serviceAppointments);
    } else {
      const filtered = serviceAppointments.filter(appointment => (
        appointment.vin.toLowerCase().includes(searchInput.toLowerCase()) ||
        appointment.customer.toLowerCase().includes(searchInput.toLowerCase())
      ));
      setFilteredAppointments(filtered);
    }
  }, [searchInput, serviceAppointments]);

  return (
    <>
      <div className="row">
        <div className="col-sm-5">
          <div className="input-group mb-1">
            <input
              id="search-input"
              type="search"
              className="form-control"
              placeholder="Search by VIN or Customer Name"
              onChange={handleSearchChange}
              value={searchInput}
            />
            <button id="search-button" type="button" className="btn btn-outline-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Customer Name</th>
              <th>Time and Date</th>
              <th>Service Reason</th>
              <th>Technician</th>
              <th>VIP treatment</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.dealership_purchase && <div>Yes</div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ServiceHistory;
