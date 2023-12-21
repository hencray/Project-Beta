import { useState } from 'react';

function CreateSalesPerson() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = first_name;
        data.last_name = last_name;
        data.employee_id = employee_id;

        const json = JSON.stringify(data);
        const url = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {method: 'POST', body: json, headers: {'Content-Type': 'application/json'}};

        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    };

    return(
        <div className="justify-content-center align-items-center">
            <div className='shadow p-4 mt-4'>
                <h1>Add a Salesperson</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} value={first_name} required placeholder="First name" name="first_name" id="first_name" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={last_name} required placeholder="Last name" name="last_name" id="last_name" />
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIdChange} value={employee_id} required placeholder="Employee ID" name="employee_id" id="employee_id" />
                    </div>
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSalesPerson;
