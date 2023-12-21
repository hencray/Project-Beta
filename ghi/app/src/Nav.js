import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">List Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/create">Create Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models">List Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models/create">Create Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">List Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/create">Create Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson">SalesPeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson/create">Add a SalesPerson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer">Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/create">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sale">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sale/create">Add a Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sale/history">SalePerson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/create">Create Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">Technician List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/create">Create Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">Appointment List</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
