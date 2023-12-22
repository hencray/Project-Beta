import React, { useEffect, useState } from "react";

function ListManufacturer() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center large-heading">Manufacturers</h1>
      </div>
      <div>
        <table className="table table-bordered small-heading">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer) => (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListManufacturer;
