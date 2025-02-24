  import axios from 'axios';

export const exerciseOptions = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/name/%7Bid%7D',
  params: {
    offset: '0',
    limit: '10'
  },
  headers: {
    'x-rapidapi-key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

// Función para obtener la lista de partes del cuerpo (body parts)
export const fetchBodyParts = async () => {
  try {
    const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      headers: {
        'x-rapidapi-key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    console.log('Datos de partes del cuerpo:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las partes del cuerpo:', error);
    return [];
  }
};

// Función para buscar ejercicios por nombre o palabra clave
export const fetchExercisesBySearch = async (search) => {
  try {
    const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/name/${search}`, {
      headers: {
        'x-rapidapi-key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });
    console.log('Datos de ejercicios encontrados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al buscar ejercicios:', error);
    return [];
  }
};
