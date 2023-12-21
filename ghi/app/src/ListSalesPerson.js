import { useState, useEffect } from 'react';

function ListSalesPerson() {
    const [salespeople, setSalesPeople] = useState([]);
    console.log(salespeople)

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if(response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map((person) => {
                return(
                    <tr key={person.id}>
                        <td>{person.employee_id}</td>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                </tr>
                )})}
            </tbody>
        </table>
    )
}

export default ListSalesPerson;
