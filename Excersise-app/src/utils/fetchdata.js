// import axios from 'axios'
 
//  export const exerciseOptions = {
//      method: 'GET',
//      headers: {
//          'X-RapidAPI-Key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
//          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//      }
//  };

// //  export const fetchData = async (url, options) => {

// //      const response = await fetch(url, options);
// //      const data = await response.json();
// //      return data;
// //  }

// export async function fetchData() {
// 	try {
// 		const response = await axios.request(exerciseOptions);
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// fetchData();

// import axios from 'axios';

// export const exerciseOptions = {
//   method: 'GET',
  
//   headers: {
//     'X-RapidAPI-Key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

// export const fetchData = async (url, options) => {
//   try {
//     const response = await axios.get(url, options); 
//     return response.data; // Devuelve los datos correctamente
//   } catch (error) {
//     console.error('Error en fetchData:', error);
//     return null; // Retorna null en caso de error para evitar `undefined`
//   }
// };

// import axios from 'axios';
// export const exerciseOptions = {
//     method: 'GET',
//     url: 'https://exercisedb.p.rapidapi.com/exercises/name/%7Bid%7D',
//     params: {
//       offset: '0',
//       limit: '10'
//     },
//     headers: {
//       'x-rapidapi-key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
//       'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
//     }
//   };
//   export const fetchData = async (search) => {
//     try {
//       const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/name/${search}`, {
//         headers: {
//           'x-rapidapi-key': 'd4b13903dcmshf0fd7b889350d2dp14b86fjsnf92070167e2e',
//           'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
//         }
//       });
//       console.log(response.data);
//       return response.data; // Asegúrate de devolver la respuesta
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//       return []; // Devuelve un arreglo vacío en caso de error
//     }
//   }
  
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
