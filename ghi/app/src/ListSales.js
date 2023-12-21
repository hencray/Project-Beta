import { useState, useEffect } from 'react';

function ListSales() {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");
        if(response.ok) {
            const data = await response.json();
            console.log(data)
            setSales(data.sales);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return(
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Salesperson Employee ID</th>
                <th>Salesperson Name</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map((sale) => {
                return(
                    <tr key={sale.id}>
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{sale.price}</td>
                </tr>
                )})}
            </tbody>
        </table>
    )
}

export default ListSales;
