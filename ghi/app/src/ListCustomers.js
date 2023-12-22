import React, { useState, useEffect } from "react";

function ListCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8090/api/customers/");
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center large-heading">Customers</h1>
      </div>
      <div>
        <table className="table table-bordered small-heading">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListCustomers;
