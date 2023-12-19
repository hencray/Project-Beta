import { useEffect, useState } from "react";

function ListAutomobile() {
    const [automobile, setAutomobile] = useState([])
    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      setAutomobile(data.automobile);
  } else {
    console.error(response);
  }}
  useEffect(() => {
    fetchData();
  }, []);

  return(
    <table className="table table-striped">
        <thead>
            <tr>
            <th>Name</th>
            </tr>
        </thead>
        <tbody>
            {automobile.map(automobile=> {
            return(<tr key={automobile.id}>
                <td>{automobile.name}</td>
            </tr>
            )})}
        </tbody>

</table>
  )
}

export default ListAutomobile;
