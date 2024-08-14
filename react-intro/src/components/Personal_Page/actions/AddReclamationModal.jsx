import React, { useState } from 'react';
import './AddReclamationModal.css';

const AddReclamationModal = ({ showModal, onClose, onSave }) => {
    const [reclamationData, setReclamationData] = useState({
        carId: '',
        description: '',
        date: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReclamationData({ ...reclamationData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(reclamationData);
    };

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>
                        Car ID:
                        <input type="text" name="carId" value={reclamationData.carId} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={reclamationData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" value={reclamationData.date} onChange={handleChange} />
                    </label>
                    <label>
                        Status:
                        <input type="text" name="status" value={reclamationData.status} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddReclamationModal;