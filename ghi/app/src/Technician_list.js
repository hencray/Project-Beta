import React, { useState, useEffect } from 'react';

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/technicians/')
      .then(response => response.json())
      .then(data => {
        setTechnicians(data.technician);
      })
      .catch(error => console.error('Error: ', error));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center large-heading">Technicians</h1>
      </div>
      <div>
        <table className="table table-bordered small-heading">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => (
              <tr key={technician.id}>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
                <td>{technician.employee_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TechnicianList;
