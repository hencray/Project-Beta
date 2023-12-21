import { useEffect, useState } from "react";

function CreateModel() {
    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePictureUrlChange = (event) => {
        setPictureUrl(event.target.value);
    };

    const handleManufacturerChange = (event) => {
        setManufacturer(event.target.value);
    };

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name,
            picture_url,
            manufacturer_id: manufacturer
        };
        
        const url = 'http://localhost:8100/api/models/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input 
                                onChange={handleNameChange} 
                                value={name} 
                                required 
                                placeholder="Model Name" 
                                name="name" 
                                id="name"
                                className="form-control" 
                            />
                            <label htmlFor="name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                onChange={handlePictureUrlChange} 
                                value={picture_url} 
                                required 
                                placeholder="Picture URL" 
                                name="picture_url" 
                                id="picture_url"
                                className="form-control" 
                            />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select 
                                onChange={handleManufacturerChange} 
                                value={manufacturer} 
                                required 
                                name="manufacturer" 
                                id="manufacturer"
                                className="form-select"
                            >
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <button className="btn btn-dark">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateModel;
