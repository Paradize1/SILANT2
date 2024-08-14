// Reclamations.jsx

import React, { useState, useEffect } from 'react';
import { GetReclamationsInfo, userReclamationsData } from './MainScripts'; // Исправляем имя переменной
import { getMaintenancecarName, getrecoverymethodName } from './Utils';

const Reclamations = () => {
    const [reclamationsData, setReclamationsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await GetReclamationsInfo(); // Используем правильную функцию
            setReclamationsData(userReclamationsData); // Используем правильную переменную
        };

        fetchData();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Зав. № машины</th>
                        <th>Дата отказа</th>
                        <th>Наработка, м/час</th>
                        <th>Узел отказа</th>
                        <th>Описание отказа</th>
                        <th>Способ восстановления</th>
                        <th>Используемые запасные части</th>
                        <th>Дата восстановления</th>
                        <th>Время простоя техники</th>
                    </tr>
                </thead>
                <tbody>
                    {reclamationsData.map(item => (
                        <tr key={item.id}>
                            <td>{getMaintenancecarName(item.car)}</td>
                            <td>{item.date_failure}</td>
                            <td>{item.operating_time}</td>
                            <td>{item.node_failure}</td>
                            <td>{item.description_failure}</td>
                            <td>{getrecoverymethodName(item.method_recovery)}</td>
                            <td>{item.repair_parts}</td>
                            <td>{item.date_recovery}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reclamations;





