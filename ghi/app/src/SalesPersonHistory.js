import React, { useState, useEffect } from 'react';

function SalesPersonHistory() {
    const [salespeople, setSalesPeople] = useState([]);
    const [salesperson, setSalesPerson] = useState('');
    const [sales, setSales] = useState([]);

    const fetchSalesPeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if(response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    };
    const fetchSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if(response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };
    useEffect(()=> {
        fetchSalesPeople();
        fetchSales();
    },[]);

    const handleSalesPersonChange = (event) => {
        setSalesPerson(event.target.value);
    };

    return(
        <div>
            <div>
                <h1 className="text-center large-heading">Salesperson History</h1>
            </div>
            <div>
                <select onChange={handleSalesPersonChange} placeholder="Select a Salesperson..." value={salesperson} required name="salesperson" id="salesperson" className='form-select large-heading'>
                    <option>Select a Salesperson</option>
                        {salespeople.map((salesperson) => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div>
                <table className="table table-bordered small-heading">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>VIN</th>
                            <th>Customer</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales
                        .filter(sale => sale.salesperson.id === parseInt(salesperson))
                        .map(sale => (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesPersonHistory;
