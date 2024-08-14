//MainScripts.jx

import { fetchCars } from '../scripts/CarsApi';
import { fetchMaintenanceData, fetchReclamationsData } from './Main_Info';

let userCarsData = [];
let userMaintenanceData = [];
let userReclamationsData = [];




// ------------------------СКРИПТ АВТО-------------------
export async function GetCarsInfo() {
    try {
        const cars = await fetchCars();
        const userId = localStorage.getItem('userId');
        const userStatus = localStorage.getItem('usernameStatus');

        if (userStatus === 'manager' || userStatus === 'service') {
            // Если статус пользователя 'manager' или 'service', возвращаем все машины
            return cars;
        } else if (userId) {
            // Иначе фильтруем машины по пользователю
            const userIdStr = String(userId);
            const userCars = cars.filter(car => String(car.client) === userIdStr);
            return userCars;
        } else {
            throw new Error('User ID is not available.');
        }
    } catch (error) {
        console.error('Ошибка при получении данных о машинах:', error);
        return [];
    }
}

// ------------------СКРИПТ ТО---------------
export async function GetMaintenanceData() {
    try {
        const maintenances = await fetchMaintenanceData();
        const userStatus = localStorage.getItem('usernameStatus');
        const userId = localStorage.getItem('userId');
        const userLocalId = localStorage.getItem('userLocalId'); // Получаем userLocalId

        console.log('User info:', getAuthData());
        console.log('User status:', userStatus);
        console.log('User ID:', userId);
        console.log('User Local ID:', userLocalId);
        console.log('All maintenance:', maintenances);

        // Проверьте, что userCarsData доступна в функции
        const userCarsData = await GetCarsInfo(); // Получаем данные о машинах

        let userMaintenanceData;

        if (userStatus === 'service') {
            const userServiceCompanyId = Number(userLocalId);
            userMaintenanceData = maintenances.filter(maintenance => maintenance.service_company === userServiceCompanyId);
        } else if (userStatus === 'manager') {
            userMaintenanceData = maintenances;
        } else if (userStatus === 'client') {
            if (!userCarsData || userCarsData.length === 0) {
                return []; // Если нет данных о пользователе, возвращаем пустой массив
            }
            const userCarIds = userCarsData.map(car => car.id);
            userMaintenanceData = maintenances.filter(maintenance => userCarIds.includes(maintenance.car));
        } else {
            return []; // Неизвестный статус пользователя
        }

        console.log('Filtered maintenance data:', userMaintenanceData);
        return userMaintenanceData;
    } catch (error) {
        console.error('Ошибка при получении данных о ТО:', error);
        return [];
    }
}

// -------------------------СКРИПТ ЮЗЕР-------------------
function getAuthData() {
    return {
        userId: localStorage.getItem('userId'),
        usernameDisplay: localStorage.getItem('username_display'),
        usernameStatus: localStorage.getItem('usernameStatus'),
    };
}


export async function GetProfileInfo() {
    const authData = {
        userId: localStorage.getItem('userId'),
        usernameDisplay: localStorage.getItem('username_display'),
        usernameStatus: localStorage.getItem('usernameStatus'),
        userLocalId: localStorage.getItem('userLocalId'),
    };

    console.log('User Profile Info:', authData);
    return authData;
}

// ----------------------СКРИПТ РЕКЛАМАЦИИ ------------------------

export async function GetReclamationsInfo() {
    try {
        const reclamations = await fetchReclamationsData(); // Получаем данные о рекламациях

        // Получаем статус пользователя и ID из локального хранилища
        const userStatus = localStorage.getItem('usernameStatus');
        const userCarIds = userCarsData.length === 0 ? (await GetCarsInfo()).map(car => car.id) : userCarsData.map(car => car.id);

        // Проверяем статус пользователя
        if (userStatus === 'service') {
            // Если статус пользователя 'service', возвращаем все рекламации
            userReclamationsData = reclamations;
        } else if (userStatus === 'manager') {
            // Если статус пользователя 'manager', возвращаем все рекламации
            userReclamationsData = reclamations;
        } else {
            // Иначе фильтруем рекламации по автомобилям пользователя
            userReclamationsData = reclamations.filter(reclamation => userCarIds.includes(reclamation.car));
        }

        return userReclamationsData;
    } catch (error) {
        console.error('Ошибка при получении данных о рекламациях:', error);
        return [];
    }
}

//  ----------------------ОБЩИЙ ЗАПУСК ----------------------

export async function runAllScripts() {
    try {
        console.log('Запуск всех скриптов...');
        await GetCarsInfo();
        await GetProfileInfo();
        await GetMaintenanceData();
        await GetReclamationsInfo();
        console.log('Все скрипты выполнены успешно');
    } catch (error) {
        console.error('Ошибка при выполнении скриптов:', error);
    }
}

export { userCarsData, userMaintenanceData, userReclamationsData };
