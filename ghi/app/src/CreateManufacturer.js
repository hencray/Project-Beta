import { useState } from "react";

function CreateManufacturer() {
    const [name, setName] = useState('');

    const handleNameChange = (event) =>{
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name=name;
        const url = 'http://localhost:8100/api/manufacturers/'
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const manufacturerResponse = await fetch(url, fetchOptions);
        if (manufacturerResponse.ok) {
            const newManufacturer = await manufacturerResponse.json();
            console.log(newManufacturer);
            setName('');


        }
    }
    return(
        <div className="row">
            <div>
                <h1>Create a manufacturer</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} required placeholder="Manufacturer name here" name="name" id="name" />
                </div>
                <div className="form-floating mb-3">
                    <button className="btn btn-primary">Create</button>
                </div>
                </form>
            </div>
        </div>

    )
}

export default CreateManufacturer;
