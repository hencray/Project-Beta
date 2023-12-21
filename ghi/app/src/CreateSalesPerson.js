import { useState } from 'react';

function CreateSalesPerson() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { first_name, last_name, employee_id };
        const json = JSON.stringify(data);
        const url = "http://localhost:8090/api/salespeople/";
        const fetchConfig = { method: 'POST', body: json, headers: {'Content-Type': 'application/json'} };

        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    };

    return(
        <div className="row">
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4 forms'>
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input 
                                onChange={handleFirstNameChange} 
                                value={first_name} 
                                required 
                                placeholder="First name" 
                                name="first_name" 
                                id="first_name"
                                className="form-control" 
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                onChange={handleLastNameChange} 
                                value={last_name} 
                                required 
                                placeholder="Last name" 
                                name="last_name" 
                                id="last_name"
                                className="form-control" 
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                onChange={handleEmployeeIdChange} 
                                value={employee_id} 
                                required 
                                placeholder="Employee ID" 
                                name="employee_id" 
                                id="employee_id"
                                className="form-control" 
                            />
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-dark">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSalesPerson;
