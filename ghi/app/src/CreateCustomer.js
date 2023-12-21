import { useState } from 'react';

function CreateCustomer() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = first_name;
        data.last_name = last_name;
        data.address = address;
        data.phone_number = phone_number;

        const json = JSON.stringify(data);
        const url = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: 'POST',
            body: json,
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    };

    return (
        <div className="justify-content-center align-items-center">
            <div className='shadow p-4 mt-4'>
                <h1>Add a customer</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} value={first_name} required placeholder="First name" name="first_name" id="first_name" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={last_name} required placeholder="Last name" name="last_name" id="last_name" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleAddressChange} value={address} required placeholder="Address" name="address" id="address" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePhoneNumberChange} value={phone_number} required placeholder="Phone number" name="phone_number" id="phone_number" />
                    </div>
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCustomer;
