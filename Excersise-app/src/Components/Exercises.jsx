 import { Box, Pagination, Stack, Typography } from '@mui/material'
 import  { useEffect } from 'react'
 import { fetchExercisesBySearch } from '../utils/fetchdata'


 const Exercises = ({ exercises, setExercises, bodyPart}) => {
   console.log(exercises);
   
   useEffect(() => {
    if (exercises.length > 0) {
      const exercisesSection = document.getElementById('exercises');
      if (exercisesSection) {
        window.scrollTo({
          top: exercisesSection.offsetTop + 200, // Ajusta este número si necesitas que baje más
          behavior: 'smooth'
        });
      }
    }
  }, [exercises]);

   return (
     <Box id="exercises"
     sx={{mt: {lg: '110px'}}}
     mt="50px"
     p="20px"
   >
     <Typography variant='h3' mb="46px">
       Showing Results
     </Typography>
     <Stack direction="row" sx={{gap: {lg: '110px', xs: "50px"}}}
     flexWrap="wrap" justifyContent="center">
       {exercises.map((exercise) => (
         <Box key={exercise.id}>
           <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
           <Typography ml="21px" color="#000" fontWeight="bold" mt="51px" pb="10px" textTransform="capitalize">
             {exercise.name}
           </Typography>
           <Typography ml="21px" color="#666" fontSize="14px" textTransform="capitalize">
             Body Part: {exercise.bodyPart}
           </Typography>
         </Box>
       ))}
     </Stack>
   </Box>
   )
 }

 export default Exercises