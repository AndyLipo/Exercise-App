 import { Box, Pagination, Stack, Typography } from '@mui/material'
 import  { useEffect } from 'react'
 import { exerciseOptions, fetchExercisesBySearch } from '../utils/fetchdata'


 const Exercises = ({ exercises, setExercises, bodyPart}) => {
   console.log(exercises);
  
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
           <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform="capitalize">
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

// import { Box, Stack, Typography } from '@mui/material'
// import { useEffect } from 'react'
// import { exerciseOptions, fetchData } from '../utils/fetchdata'

// const Exercises = ({ exercises, setExercises, bodyPart}) => {
//   useEffect(() => {
//     console.log('Exercises component montado');
//     console.log('Estado inicial de exercises:', exercises);
//   }, );

//   useEffect(() => {
//     console.log('Exercises actualizados:', exercises);
//   }, [exercises]);

//   useEffect(() => {
//     console.log('BodyPart actualizado:', bodyPart);
//   }, [bodyPart]);

//   return (
//     <Box id="exercises"
//       sx={{mt: {lg: '110px'}}}
//       mt="50px"
//       p="20px"
//     >
//       <Typography variant='h3' mb="46px">
//         Showing Results
//       </Typography>
//       <Stack direction="row" sx={{gap: {lg: '110px', xs: "50px"}}}
//       flexWrap="wrap" justifyContent="center">
//         {exercises.map((exercise) => (
//           <Box key={exercise.id} className="exercise-card">
//             <img 
//               src={exercise.gifUrl} 
//               alt={exercise.name} 
//               loading="lazy"
//               onError={(e) => console.error('Error cargando imagen:', e)}
//             />
//             <Typography ml="21px" color="#000" fontWeight="bold" mt="11px" pb="10px" textTransform="capitalize">
//               {exercise.name}
//             </Typography>
//             <Typography ml="21px" color="#666" fontSize="14px" textTransform="capitalize">
//               Body Part: {exercise.bodyPart}
//             </Typography>
//             <Typography ml="21px" color="#666" fontSize="14px" textTransform="capitalize">
//               Equipment: {exercise.equipment}
//             </Typography>
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   )
// }

// export default Exercises