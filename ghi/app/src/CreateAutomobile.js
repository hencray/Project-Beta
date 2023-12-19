import React, {useEffect, useState} from 'react';

const CreateAutomobile = () => {


    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model_id, setModel] = useState('');
    const [models, setModels] = useState([]);


    useEffect(() => {
        const modelsUrl = 'http://localhost:8100/api/models/';
        fetch(modelsUrl)
            .then(response => response.json())
            .then(data => setModels(data.models))
            .catch(e => console.error('error: ', e))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAuto = {
            'color': color,
            'year': year,
            'vin': vin,
            'model_id': model_id,
        }

        const autoUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(newAuto),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(autoUrl, fetchConfig)
            .then(response => response.json())
            .then(() => {
                setColor('');
                setYear('');
                setVin('');
                setModel('');
            })
            .catch(e => console.error('error: ', e));
    }


    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 forms">
                    <h1>Create a Automobile</h1>
                    <form onSubmit={handleSubmit} id="create-bin-form">
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} required type="text" name="color" id="color" className="form-control" />
                            <label>Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYearChange} required type="number" name="year" id="year" className="form-control" />
                            <label>Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVinChange} required type="text" name="vin" id="vin" className="form-control" />
                            <label>Vin</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} value={model_id} required id="model" name="model" className="form-select">
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-dark buttons">Create</button>
                        <a href="/automobiles/" className="btn btn-outline-dark buttons-2" type='button'>Back to Automobile list
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateAutomobile;
