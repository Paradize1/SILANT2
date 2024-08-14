import React, { useEffect, useState } from 'react';
import { fetchCars } from '../scripts/CarsApi';
import "./Body.css";

function Body() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);  
        setFilteredCars(data); // Инициализируем фильтрованные данные сразу после загрузки
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    getCars();
  }, []);
  
  const handleSearch = () => {
    const filtered = cars.filter(car => car.car_number.includes(searchTerm));
    setFilteredCars(filtered);
    if (filtered.length === 0) {
      setNoResults(true); // Показываем сообщение о пустом результате
    } else {
      setNoResults(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openModal = (title, car) => {
    let content = '';

    switch (title) {
      case 'Модель техники':
        content = car.technic_description;
        break;
      case 'Модель двигателя':
        content = car.engine_description;
        break;
      case 'Модель трансмиссии':
        content = car.transmission_description;
        break;
      case 'Модель ведущего моста':
        content = car.driving_bridge_description;
        break;
      case 'Модель управляемого моста':
        content = car.controlled_bridge_description;
        break;
      default:
        content = 'Нет описания';
    }

    setSelectedCar(car);
    setSelectedComponent(title);
    setModalContent(content);
    setModalOpen(true);
  };

    

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
    setSelectedComponent('');
    setModalContent('');
  };


  return (
    <div className='body'>

      <div className='body_1'>Проверьте комплектацию и технические характеристики <br />техники Силант</div>

      <div className='body_2'>
        <div className='factory_number'>Заводской номер
          <div className='factory_number_input_block'>
            <input 
              type='text' 
              className='factory_number_input' 
              placeholder='Введите номер' 
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>            
        </div>
        <button className='factory_number_search_button' onClick={handleSearch}>Поиск</button>
      </div>

      <div className='body_4'>
        {noResults && <p>Ничего не найдено по запросу "{searchTerm}"</p>}
        {!noResults && (
          <div>
            Информация о комплектации и технических<br /> характеристиках техники
          </div>
        )}
      </div>

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
            </tr>
          </thead>
          <tbody>
            {filteredCars.map(car => (
              <tr key={car.id}>
                <td>{car.car_number}</td>
                <td className='clickable' onClick={() => openModal('Модель техники', car)}>{car.technic_name}</td>
                <td className='clickable' onClick={() => openModal('Модель двигателя', car)}>{car.engine_name}</td>
                <td>{car.engine_number}</td>
                <td className='clickable' onClick={() => openModal('Модель трансмиссии', car)}>{car.transmission_name}</td>
                <td>{car.transmission_number}</td>
                <td className='clickable' onClick={() => openModal('Модель ведущего моста', car)}>{car.driving_bridge_name}</td>
                <td>{car.driving_bridge_number}</td>
                <td className='clickable' onClick={() => openModal('Модель управляемого моста', car)}>{car.controlled_bridge_name}</td>
                <td>{car.controlled_bridge_number}</td>
              </tr>
            ))}
          </tbody>
        </table>     
      </div>

      {modalOpen && (
        <Modal
          title={selectedComponent}
          content={modalContent}
          onClose={closeModal}
          selectedCar={selectedCar}
        />
      )}

    </div>
  );
}

export function Modal({ title, content, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}


export function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');

  const openModal = (title, content) => {
    setSelectedComponent(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedComponent('');
    setModalContent('');
  };

  return {
    modalOpen,
    modalContent,
    selectedComponent,
    openModal,
    closeModal
  };
}



export default Body;