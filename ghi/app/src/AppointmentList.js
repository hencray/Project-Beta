import React, { useEffect,  useState } from 'react'
import { Link } from 'react-router-dom'

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/appointments/')
      .then(response => response.json())
      .then(data => {
        setAppointments(data.Appointments);
      })
      .catch(e => console.error('error:', e));
  }, []);

  const onDeleteAppointmentClick = (appointment) => {
    const pk = appointment.id;
    const appointmentUrl = `http://localhost:8080/api/appointments/${pk}/`;
    const fetchConfig = {
      method: 'delete',
      headers: {
        "Content-Type": 'application/json',
      },
    };
    fetch(appointmentUrl, fetchConfig)
      .then(response => response.json())
      .then(data => {
        window.location.reload();
        if(data.deleted) {
          const currentAppointments = [...appointments];
          setAppointments(currentAppointments.filter(item => item.id !== pk));
        }
      })
      .catch(e => console.log('error' , e));
  };


  return (
    <>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <table className="table table-bordered small-heading">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Customer Name</th>
              <th>Time and Date</th>
              <th>Service Needed</th>
              <th>Technician</th>
              <th>Status</th>
              <th>VIP treatment</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date_time}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>
                  <button className="btn btn-danger buttons" onClick={() => onDeleteAppointmentClick(appointment)}>Canceled</button>
                  <button className="btn btn-success buttons" onClick={() => onDeleteAppointmentClick(appointment)}>Finished</button>
                </td>
                <td>{appointment.dealership_purchase && <div>Yes</div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/appointment/create" className="btn btn-dark buttons btn-lg px-4 gap-3">Create Appointment</Link>
      </div>
    </>
  );
}

export default AppointmentList;
