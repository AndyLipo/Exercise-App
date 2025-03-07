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

 export default Home