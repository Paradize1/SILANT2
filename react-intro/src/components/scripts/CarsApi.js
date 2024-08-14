export const fetchCars = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/cars/');
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    return [];
  }
};