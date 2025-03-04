

import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchExerciseById, fetchExerciseImages, fetchExerciseVideos } from '../utils/fetchdata'
import Detail from '../Components/Detail'
import ExerciseVideos from '../Components/ExerciseVideos'
import SimilarExercises from '../Components/SimilarExercises'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseImages, setExerciseImages] = useState([]) 
  const [exerciseVideos, setExerciseVideos] = useState([]) // Nuevo estado para videos

  const { id } = useParams();

  useEffect(() => {
    console.log("ID del ejercicio:", id); // Verifica si está cambiando correctamente
    const fetchExercisesData = async () => {
      const exerciseDetailData = await fetchExerciseById(id); 
      setExerciseDetail(exerciseDetailData);
      
      const imagesData = await fetchExerciseImages(id);
      if (imagesData.length > 0) {
        setExerciseImages(imagesData.map(img => img.image));
      }
  
      const videosData = await fetchExerciseVideos(id); // Obtener videos
      console.log("Videos obtenidos:", videosData); // Añadido para verificar los videos
      setExerciseVideos(videosData);
      
    };
  
    fetchExercisesData();
  }, [id]);
  
  
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} exerciseImages={exerciseImages} />
      <ExerciseVideos exerciseVideos={exerciseVideos}  name={exerciseDetail.name}/> {/* Pasamos los videos */}
      <SimilarExercises />
    </Box>
  );
}

export default ExerciseDetail;
