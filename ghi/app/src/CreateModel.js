import { useEffect, useState } from "react";

function CreateModel() {
    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');

    const handleNameChange = (event) =>{
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
            console.log(manufacturers)
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {};
        data.name = name;
        data.picture_url = picture_url;
        data.manufacturer_id = manufacturer;
        
        
        const url = 'http://localhost:8100/api/models/'
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const modelResponse = await fetch(url, fetchOptions);
        if (modelResponse.ok) {
            const newModel = await modelResponse.json();
            console.log(newModel);
            setName('');
            setPictureUrl('');
            setManufacturer('');


        }
    }


    return(
        <div className="row">
            <div>
                <h1>Create a vehicle model</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} required placeholder="Model name" name="name" id="name" />
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePictureUrlChange} value={picture_url} required placeholder="Picture URL" name="picture_url" id="picture_url" />
                </div>
                <div className="form-floating mb-3">
                    <select onChange={handleManufacturerChange} value={manufacturer} required name="manufacturer" id="manufacturer" className='form-select'>
                        <option>Choose a manufacturer</option>
                            {manufacturers.map((manufacturer) => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <button className="btn btn-primary">Create</button>
                </div>
                </form>
            </div>
        </div>

    )
}

export default CreateModel;
