
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  fetchExerciseById, 
  fetchExerciseImages, 
  fetchExerciseVideos,  
  fetchSimilarMuscleExercises, 
} from '../utils/fetchdata';
import Detail from '../Components/Detail';
import ExerciseVideos from '../Components/ExerciseVideos';
import SimilarExercises from '../Components/SimilarExercises';
import {fetchSimilarEquipmentExercises} from '../utils/fetchdata.js'
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseImages, setExerciseImages] = useState([]);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    console.log("ID del ejercicio:", id);
    
    setExerciseDetail({});
    setExerciseImages([]);
    setExerciseVideos([]);
    setTargetMuscleExercises([]);
    setEquipmentExercises([]);
    setIsLoading(true);
    
    const fetchExercisesData = async () => {
      try {
        const exerciseDetailData = await fetchExerciseById(id);
        console.log("Detalles del ejercicio:", exerciseDetailData);
        setExerciseDetail(exerciseDetailData);
        
        const imagesData = await fetchExerciseImages(id);
        console.log("🔍 Imágenes obtenidas:", imagesData);

        if (imagesData.length > 0) {
          setExerciseImages(imagesData.map(img => img.image));
        } else {
          console.warn("⚠️ No se encontraron imágenes para este ejercicio.");
        }
    
        const videosData = await fetchExerciseVideos(id);
        console.log("Videos obtenidos:", videosData);
        setExerciseVideos(videosData);
        
        if (exerciseDetailData.muscles && exerciseDetailData.muscles.length > 0) {
          const muscleId = exerciseDetailData.muscles[0];
          console.log("Buscando ejercicios con músculo similar:", muscleId);
          const similarMuscleData = await fetchSimilarMuscleExercises(muscleId, id);
          setTargetMuscleExercises(similarMuscleData);
        }
  
        if (exerciseDetailData.equipment && exerciseDetailData.equipment.length > 0) {
          const equipmentId = exerciseDetailData.equipment[0];
          console.log("Buscando ejercicios con equipo similar:", equipmentId);
          const similarEquipmentData = await fetchSimilarEquipmentExercises(equipmentId, id);
          setEquipmentExercises(similarEquipmentData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar datos del ejercicio:", error);
        setIsLoading(false);
      }
    };
  
    fetchExercisesData();
  }, [id]);
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Typography variant="h5">Cargando detalles del ejercicio...</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} exerciseImages={exerciseImages} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises 
        targetMuscleExercises={targetMuscleExercises} 
        equipmentExercises={equipmentExercises} 
      />
    </Box>
  );
};

export default ExerciseDetail;
