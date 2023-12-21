import { useState, useEffect } from 'react';

function ListSalesPerson() {
    const [salespeople, setSalesPeople] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if(response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <div>
                <h1 className="text-center large-heading">Sales People</h1>
            </div>
            <div>
                <table className="table table-bordered small-heading">
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListSalesPerson;
