import { useEffect, useState } from "react";

function ListModels() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        } else {
            console.error(response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-center large-heading">Models</h1>
            </div>
            <div>
                <table className="table table-bordered small-heading">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} alt={model.name} style={{maxWidth: '100px'}} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListModels;
