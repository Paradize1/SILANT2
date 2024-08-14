// GeneralInfo.jsx

import React, { useState, useEffect, useContext } from 'react';
import { fetchCarById } from './Main_Info';
import { getServiceCompanyName } from './Utils';
import { Modal, useModal } from '../Body/Body';
import { AuthContext } from '../services/AuthContext';
import { GetCarsInfo } from './MainScripts'; // Импортируем основной скрипт

const GeneralInfo = () => {
  const [filteredCarData, setFilteredCarData] = useState([]);
  const { userId, usernameStatus } = useContext(AuthContext);

  const {
    modalOpen,
    modalContent,
    selectedComponent,
    openModal,
    closeModal
  } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await GetCarsInfo(); // Получаем данные о машинах
        setFilteredCarData(carData); // Устанавливаем отфильтрованные данные в состояние
      } catch (error) {
        console.error('Ошибка при загрузке данных о машинах:', error);
      }
    };

    fetchData();
  }, [usernameStatus, userId]); // Перезапускаем useEffect, если изменятся эти зависимости

  const handleClick = (title, content) => {
    openModal(title, content);
  };

  return (
    <div className='body_table'>
      <table>
        <thead>
          <tr>
            <th>Заводской номер</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Зав. № двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Зав. № трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Грузополучатель (конечный потребитель)</th>
            <th>Адрес поставки (эксплуатации)</th>
            <th>Комплектация (доп. опции)</th>
            <th>Сервисная компания</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarData.length > 0 ? (
            filteredCarData.map(car => (
              <tr key={car.id}>
                <td>{car.car_number}</td>
                <td className='clickable' onClick={() => handleClick('Модель техники', car.technic_description)}>{car.technic_name}</td>
                <td className='clickable' onClick={() => handleClick('Модель двигателя', car.engine_description)}>{car.engine_name}</td>
                <td>{car.engine_number}</td>
                <td className='clickable' onClick={() => handleClick('Модель трансмиссии', car.transmission_description)}>{car.transmission_name}</td>
                <td>{car.transmission_number}</td>
                <td className='clickable' onClick={() => handleClick('Модель ведущего моста', car.driving_bridge_description)}>{car.driving_bridge_name}</td>
                <td>{car.driving_bridge_number}</td>
                <td className='clickable' onClick={() => handleClick('Модель управляемого моста', car.controlled_bridge_description)}>{car.controlled_bridge_name}</td>
                <td>{car.controlled_bridge_number}</td>
                <td>{car.consignee}</td>
                <td>{car.delivery_address}</td>
                <td>{car.equipment}</td>
                <td>{getServiceCompanyName(car.service_company)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">Нет данных</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {modalOpen && (
        <Modal
          title={selectedComponent}
          content={modalContent}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GeneralInfo;



