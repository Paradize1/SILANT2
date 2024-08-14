// Personal_Page.jsx

import React, { useState, useEffect, useContext } from 'react';
import './Personal_Page.css';
import GeneralInfo from './generalInfo';
import TO from './TO';
import Reclamations from './Reclamations';
import { AuthContext } from '../services/AuthContext';

import AddToModal from './actions/AddToModal';
import AddReclamationModal from './actions/AddReclamationModal';
import AddGeneralInfoModal from './actions/AddGeneralInfoModal';






function Personal_Page() {
    const { isAuthenticated, userId, usernameDisplay, usernameStatus } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(null);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [carId, setCarId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddToModal, setShowAddToModal] = useState(false);
    const [showAddReclamationModal, setShowAddReclamationModal] = useState(false);
    const [showAddGeneralInfoModal, setShowAddGeneralInfoModal] = useState(false);

    useEffect(() => {
        if (isAuthenticated && userId) {
            setIsUserDataLoaded(true);
            fetchCarId(userId);
        }
    }, [isAuthenticated, userId]);

    const fetchCarId = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/client_cars/${userId}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch car data');
            }
            const data = await response.json();
            console.log('Received car data:', data);
            setCarId(data.carId);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching car data:', error);
            setLoading(false);
        }
    };

    const handleAddTO = () => {
        setShowAddToModal(true);
    };

    const handleCloseAddToModal = () => {
        setShowAddToModal(false);
    };

    const handleSaveTO = async (toData) => {
        try {
            const response = await fetch('http://localhost:8000/api/add_to/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toData),
            });

            if (!response.ok) {
                throw new Error('Failed to add TO data');
            }

            handleCloseAddToModal();
        } catch (error) {
            console.error('Error adding TO data:', error);
        }
    };

    const handleAddReclamation = () => {
        setShowAddReclamationModal(true);
    };

    const handleCloseAddReclamationModal = () => {
        setShowAddReclamationModal(false);
    };

    const handleSaveReclamation = async (reclamationData) => {
        try {
            const response = await fetch('http://localhost:8000/api/add_reclamation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reclamationData),
            });

            if (!response.ok) {
                throw new Error('Failed to add reclamation data');
            }

            handleCloseAddReclamationModal();
        } catch (error) {
            console.error('Error adding reclamation data:', error);
        }
    };

    const handleAddGeneralInfo = () => {
        if (usernameStatus === 'manager') {
            setShowAddGeneralInfoModal(true);
        } else {
            alert('У вас нет доступа для добавления общей информации.');
        }
    };

    const handleCloseAddGeneralInfoModal = () => {
        setShowAddGeneralInfoModal(false);
    };

    const handleSaveGeneralInfo = async (generalInfoData) => {
        try {
            if (usernameStatus === 'manager') {
                const response = await fetch('http://localhost:8000/api/add_general_info/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(generalInfoData),
                });

                if (!response.ok) {
                    throw new Error('Failed to add general info data');
                }

                handleCloseAddGeneralInfoModal();
            } else {
                alert('У вас нет доступа для добавления общей информации.');
            }
        } catch (error) {
            console.error('Error adding general info data:', error);
        }
    };

    const renderContent = () => {
        if (!isUserDataLoaded) {
            return <div className='loader'>Загрузка...</div>;
        }

        switch (activeTab) {
            case 'info':
                return <GeneralInfo />;
            case 'to':
                return <TO carId={carId} />;
            case 'reclamacion':
                return <Reclamations carId={carId} />;
            default:
                return null;
        }
    };

    return (
        <div className='personal_main'>
            <div className='client_and_company'>{usernameDisplay}</div>
            <div className='status'>{usernameStatus}</div>
            <div className='personal_text'>
                Информация о комплектации и технических <br /> характеристиках Вашей техники
            </div>

            <div className='personal_buttons'>
                    <button className='button_info' onClick={() => setActiveTab('info')}>
                        общая инфо
                    </button>
                <button className='button_to' onClick={() => setActiveTab('to')}>
                    ТО
                </button>
                <button className='button_reclamac' onClick={() => setActiveTab('reclamacion')}>
                    рекламации
                </button>
            </div>

            {(usernameStatus === 'client' || usernameStatus === 'service' || usernameStatus === 'manager') && (
                <div className='add_buttons'>
                    <button onClick={handleAddTO}>Добавить ТО</button>
                    {(usernameStatus === 'service' || usernameStatus === 'manager') && (
                        <button onClick={handleAddReclamation}>Добавить рекламацию</button>
                    )}
                    {usernameStatus === 'manager' && (
                        <button onClick={handleAddGeneralInfo}>Добавить общую инфо</button>
                    )}
                </div>
            )}

            {loading ? <div className='loader'>Загрузка...</div> : renderContent()}

            <AddToModal showModal={showAddToModal} onClose={handleCloseAddToModal} onSave={handleSaveTO} />

            <AddReclamationModal
                showModal={showAddReclamationModal}
                onClose={handleCloseAddReclamationModal}
                onSave={handleSaveReclamation}
            />

            <AddGeneralInfoModal
                showModal={showAddGeneralInfoModal}
                onClose={handleCloseAddGeneralInfoModal}
                onSave={handleSaveGeneralInfo}
            />
        </div>
    );
}

export default Personal_Page;


