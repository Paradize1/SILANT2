// Main_Info.js

export const fetchCarById = async (carId) => {
    const apiUrl = `http://127.0.0.1:8000/api/cars/${carId}/`;
  
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
  
      const carData = await response.json();
      return carData;
    } catch (error) {
      console.error('Произошла ошибка:', error);
      return null;
    }
  };



export const fetchMaintenanceData = async (carId) => {
    try {

        const response = await fetch(`http://localhost:8000/api/maintenances/`);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
};

  

export const fetchReclamationsData = async (carId) => {
    try {
        console.log('таблица рекламации');

        const response = await fetch(`http://localhost:8000/api/reclamations/`);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
};