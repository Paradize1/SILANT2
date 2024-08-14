import React, { useState, useEffect, useContext } from 'react';
import { fetchMaintenanceData } from './Main_Info'; // Убедитесь, что этот импорт правильный
import { getServiceCompanyName, getMaintenanceTypeName, getMaintenancecarName } from './Utils';
import { AuthContext } from '../services/AuthContext';
import { CarDataContext } from './generalInfo';
import { GetMaintenanceData } from './MainScripts'; // Импортируем основной скрипт

const TO = () => {
    const [filteredMaintenanceData, setFilteredMaintenanceData] = useState([]);
    const { userId, userLocalId, usernameStatus } = useContext(AuthContext); // Получаем данные из контекста

    useEffect(() => {
        const fetchData = async () => {
            try {
                const maintenanceData = await GetMaintenanceData(); // Получаем данные ТО
                setFilteredMaintenanceData(maintenanceData); // Устанавливаем отфильтрованные данные в состояние
            } catch (error) {
                console.error('Error fetching maintenance data:', error);
            }
        };

        fetchData();
    }, [usernameStatus, userId, userLocalId]); // Перезапускаем useEffect, если изменятся эти зависимости

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Зав. № машины</th>
                        <th>Вид ТО</th>
                        <th>Дата проведения ТО</th>
                        <th>Наработка, м/час</th>
                        <th>№ заказ-наряда</th>
                        <th>Дата заказ-наряда</th>
                        <th>Организация, проводившая ТО</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaintenanceData.length > 0 ? (
                        filteredMaintenanceData.map(item => (
                            <tr key={item.id}>
                                <td>{getMaintenancecarName(item.car)}</td>
                                <td>{getMaintenanceTypeName(item.type)}</td>
                                <td>{item.date}</td>
                                <td>{item.operating_time}</td>
                                <td>{item.order_number}</td>
                                <td>{item.order_date}</td>
                                <td>{getServiceCompanyName(item.service_company)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Нет данных</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TO;
