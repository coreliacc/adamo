import React, { useEffect, useState } from 'react';

function TipoViaSelect({ onTipoViaSelect }) {
    const [tiposVia, setTiposVia] = useState([]);

    useEffect(() => {
        const fetchTiposVia = async () => {
            const response = await fetch('http://localhost:5000/api/tipos_via');
            const data = await response.json();
            setTiposVia(data);
        };
        fetchTiposVia();
    }, []);

    return (
        <div className="mb-4">
            <label className="block text-gray-700">Tipo de Vía</label>
            <select onChange={(e) => onTipoViaSelect(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Selecciona un tipo de vía</option>
                {tiposVia.map((via, index) => (
                    <option key={index} value={via.tipo_via}>
                        {via.tipo_via}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TipoViaSelect;
