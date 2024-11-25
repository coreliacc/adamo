import React from 'react';

function Modal({ cobertura, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                <h2 className="text-2xl font-bold mb-4">
                    {cobertura ? 'SI HAY COBERTURA' : 'NO HAY COBERTURA'}
                </h2>
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default Modal;
