import { useState } from "react";

function CreateAutomobile() {
    const [name, setName] = useState('');

    const handleNameChange = (event) =>{
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name=name;
        const url = 'http://localhost:8100/api/automobiles/'
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const automobileResponse = await fetch(url, fetchOptions);
        if (automobileResponse.ok) {
            const newAutomobile = await automobileResponse.json();
            console.log(newAutomobile);
            setName('');


        }
    }
    return(
        <div className="row">
            <div>
                <h1>Create an Automobile</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} required placeholder="Automobile name here" name="name" id="name" />
                </div>
                <div className="form-floating mb-3">
                    <button className="btn btn-primary">Create</button>
                </div>
                </form>
            </div>
        </div>

    )
}

export default CreateAutomobile;
