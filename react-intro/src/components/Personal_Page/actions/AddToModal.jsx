import React, { useState } from 'react';
import './AddToModal.css';

const AddToModal = ({ showModal, onClose, onSave }) => {
    const [toData, setToData] = useState({
        carId: '',
        type: '',
        date: '',
        operatingTime: '',
        orderNumber: '',
        orderDate: '',
        serviceCompany: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToData({ ...toData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(toData);
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
                        <input type="text" name="carId" value={toData.carId} onChange={handleChange} />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" value={toData.type} onChange={handleChange} />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" value={toData.date} onChange={handleChange} />
                    </label>
                    <label>
                        Operating Time:
                        <input type="text" name="operatingTime" value={toData.operatingTime} onChange={handleChange} />
                    </label>
                    <label>
                        Order Number:
                        <input type="text" name="orderNumber" value={toData.orderNumber} onChange={handleChange} />
                    </label>
                    <label>
                        Order Date:
                        <input type="date" name="orderDate" value={toData.orderDate} onChange={handleChange} />
                    </label>
                    <label>
                        Service Company:
                        <input type="text" name="serviceCompany" value={toData.serviceCompany} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddToModal;