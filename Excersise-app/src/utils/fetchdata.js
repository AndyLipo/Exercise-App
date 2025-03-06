
import axios from 'axios';

const API_URL = 'https://wger.de/api/v2/exercise/';
const IMAGE_API_URL = 'https://wger.de/api/v2/exerciseimage/';
const API_KEY = '78c0c51eff3f00ec2199c9b8914d529d57bc6165'; // Reemplázalo con tu clave real
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x400?text=No+Image';
const API_KEY_YOUTUBE = 'AIzaSyDfWM59zpv4QPgM_VRTKvw81ro5V0alUDs'
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
export const fetchExercisesBySearch = async (searchTerm) => {
  try {
    console.log(`🔎 Iniciando búsqueda con término: ${searchTerm}`);
    const response = await fetch(`${API_URL}?limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener ejercicios');
    }

    const data = await response.json();
    console.log("📋 Datos completos de ejercicios:", data);

    // Filtrar los ejercicios según el término de búsqueda
    const filteredResults = data.results.filter(exercise => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (exercise.name && exercise.name.toLowerCase().includes(searchTermLower)) ||
        (exercise.description && exercise.description.toLowerCase().includes(searchTermLower))
      );
    });

    console.log(`✅ Se encontraron ${filteredResults.length} ejercicios.`);

    // Obtener imágenes para cada ejercicio
    const exercisesWithImages = await Promise.all(
      filteredResults.map(async (exercise) => {
        console.log(`🔎 Buscando imagen para ejercicio ID: ${exercise.id}, Base: ${exercise.exercise_base}`);

        try {
          // Intentar obtener imágenes usando exercise_base
          let imageResponse = await fetch(`${IMAGE_API_URL}?exercise_base=${exercise.exercise_base}`);
          let imageData = await imageResponse.json();

          // Si no hay imágenes con exercise_base, intentamos con exercise.id
          if (!imageData.results.length) {
            console.log(`🚨 No se encontraron imágenes para Base ID ${exercise.exercise_base}. Probando con ID ${exercise.id}`);
            imageResponse = await fetch(`${IMAGE_API_URL}?exercise=${exercise.id}`);
            imageData = await imageResponse.json();
          }

          console.log(`📷 Imágenes encontradas para ID ${exercise.id}:`, imageData.results);

          // Seleccionar la primera imagen disponible o un placeholder si no hay ninguna
          const imageUrl = imageData.results.length > 0 ? imageData.results[0].image : PLACEHOLDER_IMAGE;

          return { ...exercise, gifUrl: imageUrl };
        } catch (error) {
          console.error(`❌ Error al obtener imagen para el ejercicio ${exercise.id}:`, error);
          return { ...exercise, gifUrl: PLACEHOLDER_IMAGE };
        }
      })
    );

    return {
      ...data,
      results: exercisesWithImages, // Actualizar resultados con las imágenes
    };

  } catch (error) {
    console.error('❌ Error fetching exercises:', error);
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

    console.log('📌 Detalles del ejercicio:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener el ejercicio:', error);
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

    console.log('📂 Categorías de ejercicios:', response.data.results);
    return response.data.results;
  } catch (error) {
    console.error('❌ Error al obtener las partes del cuerpo:', error);
    return [];
  }
};

export const fetchExerciseImages = async (exerciseId) => {
  try {
    console.log(`🔎 Buscando imágenes para el ejercicio ID: ${exerciseId}`);
    
    // Primero, obtener los detalles del ejercicio para conseguir el exercise_base
    const exerciseDetails = await axios.get(`${API_URL}${exerciseId}/`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    
    const exerciseBase = exerciseDetails.data.exercise_base;
    console.log(`🔍 Exercise Base encontrado: ${exerciseBase}`);
    
    // Buscar imágenes por exercise base
    const response = await axios.get(`${IMAGE_API_URL}?exercise_base=${exerciseBase}`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });
    
    // Filtrar imágenes para asegurar que correspondan al exercise_base correcto
    const imageUrls = response.data.results
      .filter(img => img.exercise_base === exerciseBase)
      .map(img => img.image)
      .filter(url => url && url.startsWith('http'));
    
    console.log('🖼️ URLs de imágenes encontradas:', imageUrls);
    
    return imageUrls.length > 0 ? imageUrls : [];
  } catch (error) {
    console.error('❌ Error al obtener las imágenes del ejercicio:', error);
    
    // Más registro detallado de errores
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    
    return [];
  }
};


export const fetchExerciseVideos = async (exerciseId) => {
  try {
    // First, fetch the exercise base information
    const exerciseResponse = await axios.get(`https://wger.de/api/v2/exercise/${exerciseId}/`);
    const exerciseName = exerciseResponse.data.name;

    // Fetch videos from YouTube
    const youtubeResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: `${exerciseName} exercise tutorial`,
        type: 'video',
        maxResults: 3,
        key: API_KEY_YOUTUBE // Use environment variable
      }
    });

    console.log('YouTube Videos Raw Response:', youtubeResponse.data);

    // Transform YouTube video data
    const transformedVideos = youtubeResponse.data.items.map(video => ({
      video: {
        videoId: video.id.videoId,
        title: video.snippet.title,
        channelName: video.snippet.channelTitle,
        thumbnails: [
          { url: video.snippet.thumbnails.medium.url }
        ],
        video: `https://www.youtube.com/watch?v=${video.id.videoId}`
      }
    }));

    console.log('Transformed Videos:', transformedVideos);

    return transformedVideos;

  } catch (error) {
    console.error(`Error fetching videos for exercise ${exerciseId}:`, error);
    
    // More detailed error logging
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    
    return [];
  }
};
export const fetchSimilarEquipmentExercises = async (equipmentId, excludeExerciseId) => {
  try {
    if (!equipmentId) {
      console.error('No se proporcionó ID de equipo');
      return [];
    }
    
    console.log(`Buscando ejercicios con equipo similar (ID: ${equipmentId}, excluyendo ejercicio ID: ${excludeExerciseId})`);
    
    const response = await axios.get(`https://wger.de/api/v2/exercise/?equipment=${equipmentId}&limit=12`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    // Filtrar para no incluir el ejercicio actual y limitar a 6 ejercicios
    const similarExercises = response.data.results
      .filter(exercise => exercise.id.toString() !== excludeExerciseId.toString())
      .slice(0, 6);

    console.log(`📂 Ejercicios con el mismo equipo (${equipmentId}):`, similarExercises);

    // Para cada ejercicio similar, obtener su imagen y añadir la URL al objeto
    const exercisesWithImages = await Promise.all(
      similarExercises.map(async (exercise) => {
        try {
          const imageUrl = await fetchSimilarExerciseImages(exercise.id);
          
          // Crear un nuevo objeto con todos los datos del ejercicio más la imagen
          return {
            ...exercise,
            image: imageUrl
          };
        } catch (error) {
          console.error(`Error al procesar imagen para ejercicio ${exercise.id}:`, error);
          return {
            ...exercise,
            image: 'https://via.placeholder.com/150?text=No+Image+Available'
          };
        }
      })
    );

    console.log('Ejercicios con imágenes (equipment):', exercisesWithImages);
    return exercisesWithImages;
  } catch (error) {
    console.error(`❌ Error al obtener ejercicios similares por equipo (${equipmentId}):`, error);
    return [];
  }
};

// Función para obtener ejercicios que trabajan el mismo músculo
export const fetchSimilarMuscleExercises = async (muscleId, excludeExerciseId) => {
  try {
    if (!muscleId) {
      console.error('No se proporcionó ID de músculo');
      return [];
    }
    
    console.log(`Buscando ejercicios con músculo similar (ID: ${muscleId}, excluyendo ejercicio ID: ${excludeExerciseId})`);
    
    const response = await axios.get(`https://wger.de/api/v2/exercise/?muscles=${muscleId}&limit=12`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    // Filtrar para no incluir el ejercicio actual y limitar a 6 ejercicios
    const similarExercises = response.data.results
      .filter(exercise => exercise.id.toString() !== excludeExerciseId.toString())
      .slice(0, 6);

    console.log(`📂 Ejercicios que trabajan el músculo (${muscleId}):`, similarExercises);

    // Para cada ejercicio similar, obtener su imagen
    const exercisesWithImages = await Promise.all(
      similarExercises.map(async (exercise) => {
        try {
          const imageUrl = await fetchSimilarExerciseImages(exercise.id);
          
          // Crear un nuevo objeto con todos los datos del ejercicio más la imagen
          return {
            ...exercise,
            image: imageUrl
          };
        } catch (error) {
          console.error(`Error al procesar imagen para ejercicio ${exercise.id}:`, error);
          return {
            ...exercise,
            image: 'https://via.placeholder.com/150?text=No+Image+Available'
          };
        }
      })
    );

    console.log('Ejercicios con imágenes (muscle):', exercisesWithImages);
    return exercisesWithImages;
  } catch (error) {
    console.error(`❌ Error al obtener ejercicios similares por músculo (${muscleId}):`, error);
    return [];
  }
};

// Función para obtener imágenes de un ejercicio
export const fetchSimilarExerciseImages = async (exerciseId) => {
  try {
    const response = await axios.get(`https://wger.de/api/v2/exerciseimage/?exercise=${exerciseId}`, {
      headers: {
        'Authorization': `Token ${API_KEY}`
      }
    });

    const images = response.data.results;
    console.log(`🖼️ Imágenes para ejercicio ${exerciseId}:`, images);

    // Si hay imágenes disponibles, devuelve la URL de la primera imagen
    if (images && images.length > 0 && images[0].image) {
      return images[0].image;
    } else {
      console.log(`No se encontraron imágenes para el ejercicio ${exerciseId}`);
      return 'https://via.placeholder.com/150?text=No+Image+Available';
    }
  } catch (error) {
    console.error(`❌ Error al obtener imágenes del ejercicio ${exerciseId}:`, error);
    return 'https://via.placeholder.com/150?text=No+Image+Available';
  }
};