export const getServiceCompanyName = (companyId) => {
    switch (companyId) {
      case 10:
        return 'ООО Промышленная техника';
      case 11:
        return 'ООО Силант';
      case 12:
        return 'ООО ФНС';
        case null:
        return 'самостоятельно';
      // Добавляйте сюда новые идентификаторы и названия компаний по мере необходимости
      default:
        return companyId; // Если название неизвестно, отобразить сам идентификатор
    }
  };


export const getMaintenanceTypeName = (typeId) => {
    switch (typeId) {
        case 2:
            return 'ТО-0 (50 м/час)';
        case 3:
            return 'ТО-1 (200 м/час)';
        case 4:
            return 'ТО-2 (400 м/час)';
        case 5:
            return 'ТО-4 (1000 м/час)';
        case 6:
            return 'ТО-5 (2000 м/час)';
        default:
            return `Unknown Type (${typeId})`;
    }
};

export const getMaintenancecarName = (carId) => {
    switch (carId) {
        case 1:
            return '0017';
        case 2:
            return '0021';
        case 3:
            return '0032';
        case 4:
            return '0003';
        case 5:
            return '0016';
        case 6:
            return '0039';
        case 7:
            return '0045';
        case 8:
            return '0019';
        case 9:
            return '0008';
        default:
            return `Unknown Type (${carId})`;
    }
};

export const getrecoverymethodName = (method_recoveryId) => {
    switch (method_recoveryId) {
        case 1:
            return 'Ремонт узла';
        case 2:
            return 'Замена узла';
        
            default:
                return method_recoveryId;
    }
};