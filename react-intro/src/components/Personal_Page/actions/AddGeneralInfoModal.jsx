// AddGeneralInfoModal.jsx

import React, { useState } from 'react';
import './AddGeneralInfoModal.css';

const AddGeneralInfoModal = ({ showModal, onClose, onSave }) => {
    const [generalInfoData, setGeneralInfoData] = useState({
        carId: '',
        description: '',
        date: '',
        otherInfo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneralInfoData({ ...generalInfoData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(generalInfoData);
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
                        <input type="text" name="carId" value={generalInfoData.carId} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={generalInfoData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" value={generalInfoData.date} onChange={handleChange} />
                    </label>
                    <label>
                        Other Info:
                        <textarea name="otherInfo" value={generalInfoData.otherInfo} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddGeneralInfoModal;
