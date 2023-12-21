import { useState, useEffect } from 'react';

function CreateSale() {
    const [automobile, setAutomobile] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [salesperson, setSalesPerson] = useState('');
    const [salespeople, setSalesPeople] = useState([]);
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');

    const fetchAutomobiles = async () => {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        if(response.ok) {
            const data = await response.json();
            const availableAutos = data.autos.filter(auto => !auto.sold);
            setAutomobiles(availableAutos);
        }
    }

    const fetchSalesPeople = async () => {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if(response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespeople);
        }
    }
    const fetchCustomers = async () => {
        const response = await fetch("http://localhost:8090/api/customers/");
        if(response.ok) {
            const data =  await response.json();
            setCustomers(data.customers);
        }
    }
    useEffect(() => {
        fetchAutomobiles();
        fetchCustomers();
        fetchSalesPeople();
    }, [])
  
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const updateAutomobileSoldStatus = async (auto) => {
        const url = `http://localhost:8100/api/automobiles/${auto}/`;
        const fetchConfig = {
            method: 'PUT',
            body: JSON.stringify({ "sold": true }),
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            console.log('Sold true.');
        } else {
            console.error('Error.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.customer = customer;
        data.salesperson = salesperson;
        data.automobile = automobile;

        const json = JSON.stringify(data);
        const url = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: 'POST', body: json, headers: { 'Content-Type': 'application/json'}
        };
      
        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            await updateAutomobileSoldStatus(automobile);
            fetchAutomobiles();

            setCustomer('');
            setPrice('');
            setAutomobile('');
            setSalesPerson('');
        }
    }

    return(
        <div className="justify-content-center align-items-center">
            <div className='shadow p-4 mt-4'>
                <h1>Record a new sale</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Automobile VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile" >
                            <option>Choose a VIN</option>
                            {automobiles.map((automobile) => {
                                return (
                                    <option key={automobile.id} value={automobile.vin}>
                                        {automobile.vin}
                                    </option>
                                )
                             })}
                        </select>
                    </div>
                    <div>
                        <label>Salesperson</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" onChange={handleSalesPersonChange} value={salesperson} required name="salesperson" id="salesperson" >
                            <option>Choose a salesperson</option>
                            {salespeople.map((salesperson) => {
                                return (
                                    <option key={salesperson.id} value={salesperson.employee_id}>
                                        {salesperson.first_name}
                                    </option>
                                )
                             })}
                        </select>
                    </div>
                    <div>
                        <label>Customer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" onChange={handleCustomerChange} value={customer} required name="customer" id="customer" >
                            <option>Choose a customer</option>
                            {customers.map((customer) => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.first_name}
                                    </option>
                                )
                             })}
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePriceChange} value={price} required name="price" id="price" />
                    </div>
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSale;
