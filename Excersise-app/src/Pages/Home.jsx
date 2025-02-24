 import { Box } from '@mui/material'
 import  { useState } from 'react'
 import HeroBanner from '../Components/HeroBanner'
 import SearchExercises from '../Components/SearchExercises'
 import Exercises from '../Components/Exercises'
 const Home = () => {
   const [exercises, setExercises] = useState([])
   const [bodyPart, setBodyPart] = useState('all')
   return (
     <Box>
         <HeroBanner/>
         <SearchExercises 
           setExercises={setExercises}
           bodyPart={bodyPart}
           setBodyPart={setBodyPart}
         />
         <Exercises
           exercises={exercises}
           setExercises={setExercises}
           bodyPart={bodyPart}
         />
     </Box>
   )
 }

// export default Home
// import { Box } from '@mui/material'
// import { useEffect, useState } from 'react'
// import HeroBanner from '../Components/HeroBanner'
// import SearchExercises from '../Components/SearchExercises'
// import Exercises from '../Components/Exercises'

// const Home = () => {
//   const [exercises, setExercises] = useState([])
//   const [bodyPart, setBodyPart] = useState('all')

//   useEffect(() => {
//     console.log('Home component montado');
//   }, []);

//   useEffect(() => {
//     console.log('Estado de exercises en Home actualizado:', exercises);
//   }, [exercises]);

//   useEffect(() => {
//     console.log('Estado de bodyPart en Home actualizado:', bodyPart);
//   }, [bodyPart]);

//   return (
//     <Box>
//       <HeroBanner/>
//       <SearchExercises
//         setExercises={setExercises}
//         bodyPart={bodyPart}
//         setBodyPart={setBodyPart}
//       />
//       <Exercises
//         exercises={exercises}
//         setExercises={setExercises}
//         bodyPart={bodyPart}
//       />
//     </Box>
//   )
// }
 export default Home