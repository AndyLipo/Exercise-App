
// ✅ URL de la API externa ExerciseDB
import axios from 'axios';

const API_URL = 'https://wger.de/api/v2/exercise/';
const API_KEY = '78c0c51eff3f00ec2199c9b8914d529d57bc6165'; // Reemplázalo con tu clave real

// 🔹 Función para obtener todos los ejercicios
export const fetchExercises = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    console.log('Lista de ejercicios:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    return [];
  }
};

// 🔹 Función para buscar ejercicios por nombre
// export const fetchExercisesBySearch = async (searchTerm) => {
//   try {
//     // Obtiene los datos sin filtrar de la API
//     const response = await fetch('https://wger.de/api/v2/exercise/?limit=50', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error('Error al obtener ejercicios');
//     }
    
//     const data = await response.json();
//     console.log("Datos completos de ejercicios:", data);
    
//     // Filtra los resultados según el término de búsqueda
//     // Esto parece no estar sucediendo en la API, así que debemos hacerlo manualmente
//     const filteredResults = data.results.filter(exercise => {
//       const searchTermLower = searchTerm.toLowerCase();
      
//       // Comprobamos si los campos existen y contienen el término de búsqueda
//       return (
//         (exercise.name && exercise.name.toLowerCase().includes(searchTermLower)) ||
//         (exercise.description && exercise.description.toLowerCase().includes(searchTermLower))
//       );
//     });
    
//     // Devuelve un objeto con la misma estructura pero con resultados filtrados
//     return {
//       ...data,
//       results: filteredResults
//     };
    
//   } catch (error) {
//     console.error('Error fetching exercises:', error);
//     return { results: [] };
//   }
// };


// 🔹 Función para buscar ejercicios por nombre
export const fetchExercisesBySearch = async (searchTerm) => {
  try {
    const response = await fetch('https://wger.de/api/v2/exercise/?limit=50', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener ejercicios');
    }

    const data = await response.json();
    console.log("Datos completos de ejercicios:", data);

    // Filtrar los ejercicios según el término de búsqueda
    const filteredResults = data.results.filter(exercise => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (exercise.name && exercise.name.toLowerCase().includes(searchTermLower)) ||
        (exercise.description && exercise.description.toLowerCase().includes(searchTermLower))
      );
    });

    // Ahora, para cada ejercicio, obtenemos las imágenes relacionadas
    const exercisesWithImages = await Promise.all(
      filteredResults.map(async (exercise) => {
        // Obtener imágenes para el ejercicio
        const imageResponse = await fetch(`https://wger.de/api/v2/exerciseimage/?exercise=${exercise.id}`);
        const imageData = await imageResponse.json();
        
        // Obtener la URL de la primera imagen (si existe)
        const imageUrl = imageData.results.length > 0 ? imageData.results[0].image : null;

        // Añadir la URL de la imagen al ejercicio
        return { ...exercise, gifUrl: imageUrl };
      })
    );

    return {
      ...data,
      results: exercisesWithImages, // Actualizar resultados con las imágenes
    };

  } catch (error) {
    console.error('Error fetching exercises:', error);
    return { results: [] };
  }
};

// 🔹 Función para obtener detalles de un ejercicio por ID
export const fetchExerciseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    console.log('Detalles del ejercicio:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el ejercicio:', error);
    return null;
  }
};

// 🔹 Función para obtener todas las categorías de ejercicios
export const fetchBodyParts = async () => {
  try {
    const response = await axios.get('https://wger.de/api/v2/exercisecategory/', {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    console.log('Categorías de ejercicios:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener las partes del cuerpo:', error);
    return [];
  }
};

export const fetchExerciseImages = async (exerciseId) => {
  try {
    const response = await axios.get(`https://wger.de/api/v2/exerciseimage/?exercise=${exerciseId}`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    console.log('Imágenes del ejercicio:', response.data);
    return response.data.results; // Devuelve las imágenes
  } catch (error) {
    console.error('Error al obtener las imágenes del ejercicio:', error);
    return [];
  }
};