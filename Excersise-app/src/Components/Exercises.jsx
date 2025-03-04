  import { Box, Grid2, Pagination, Stack, Typography } from '@mui/material';
  import { useEffect, useState } from 'react';
  import PropTypes from 'prop-types'; // ✅ Importa PropTypes
  import ExerciseCard from './ExerciseCard';
  import Loader from './Loader';

  const Exercises = ({ exercises, setExercises, bodyPart }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisesPerPage] = useState(6);

    useEffect(() => {
      if (exercises.length > 0) {
        const exercisesSection = document.getElementById('exercises');
        if (exercisesSection) {
          window.scrollTo({
            top: exercisesSection.offsetTop + 200, // Ajusta este número si necesitas que baje más
            behavior: 'smooth',
          });
        }
      }
    }, [exercises]);
    useEffect(() => {
      console.log("Ejercicios actuales:", exercises);
    }, [exercises]);
    
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (event, value) => {
      setCurrentPage(value);
      window.scrollTo({ top: 1800, behavior: 'smooth' });
    };

    if (!currentExercises.length) return <Loader />;

    return (
      <Box id="exercises" sx={{ mt: { lg: '110px', xs: '50px' }, p: '20px' }}>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
        mb="46px"
      >
        Showing Results
      </Typography>
    
      {/* Grid para ejercicios */}
      <Grid2 
  container
  spacing={6} // 🔹 Reduce espaciado entre celdas
  sx={{ 
    marginBottom: '400px',
    marginLeft: '440px',
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, minmax(250px, 1fr))', // 🔹 Controla el tamaño mínimo de las columnas
    columnGap: '175px', // 💡 Más espacio entre columnas
    rowGap: '50px', // 🔹 Menos espacio entre filas
    justifyContent: 'center', 
    width: '100%'
  }}
>
  {currentExercises.map((exercise, idx) => (
    <Grid2 
      key={idx} 
      xs={12} sm={6} md={4} 
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <ExerciseCard exercise={exercise} />
    </Grid2>
  ))}
</Grid2>

    
      {/* Paginación */}
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>    
    );
  };

  // ✅ Validación de Props con PropTypes
  Exercises.propTypes = {
    exercises: PropTypes.array.isRequired, // 👈 `exercises` debe ser un array
    setExercises: PropTypes.func.isRequired, // 👈 `setExercises` es una función
    bodyPart: PropTypes.string.isRequired, // 👈 `bodyPart` es un string
  };

  export default Exercises;
