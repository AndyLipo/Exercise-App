//  import { Box, Pagination, Stack, Typography } from '@mui/material'
//  import  { useEffect, useState } from 'react'
//  import { fetchExercisesBySearch } from '../utils/fetchdata'
// import ExerciseCard from './ExerciseCard'
// import Loader from './Loader'


//  const Exercises = ({ exercises, setExercises, bodyPart}) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [exercisesPerPage] = useState(6);

//    useEffect(() => {
//     if (exercises.length > 0) {
//       const exercisesSection = document.getElementById('exercises');
//       if (exercisesSection) {
//         window.scrollTo({
//           top: exercisesSection.offsetTop + 200, // Ajusta este número si necesitas que baje más
//           behavior: 'smooth'
//         });
//       }
//     }
//   }, [exercises]);


//   const indexOfLastExercise = currentPage * exercisesPerPage;
//   const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
//   const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

//   const paginate = (event, value) => {
//     setCurrentPage(value);

//     window.scrollTo({ top: 1800, behavior: 'smooth' });
//   };

//   if (!currentExercises.length) return <Loader />;

//    return (
//      <Box id="exercises"
//      sx={{mt: {lg: '110px'}}}
//      mt="50px"
//      p="20px"
//    >
//      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
//        Showing Results
//      </Typography>
//      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
//         {currentExercises.map((exercise, idx) => (
//           <ExerciseCard key={idx} exercise={exercise} />
//         ))}
//       </Stack>
//       <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
//         {exercises.length > 9 && (
//           <Pagination
//             color="standard"
//             shape="rounded"
//             defaultPage={1}
//             count={Math.ceil(exercises.length / exercisesPerPage)}
//             page={currentPage}
//             onChange={paginate}
//             size="large"
//           />
//         )}
//       </Stack>
//    </Box>
//    )
//  }

//  export default Exercises

  import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
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
      <Box id="exercises" sx={{ mt: { lg: '110px' }, mt: '50px', p: '20px' }}>
  <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
    Showing Results
  </Typography>

  {/* Solución: Eliminar el Box redundante y usar directamente el Grid */}
  <Grid container spacing={3} justifyContent="center">
    {currentExercises.map((exercise, idx) => (
      <Grid item key={idx} xs={12} sm={6} md={4}>
        <ExerciseCard exercise={exercise} />
      </Grid>
    ))}
  </Grid>

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
